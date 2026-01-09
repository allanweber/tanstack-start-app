import { getFoodBySlug } from '@/api/foods'
import { SearchAsync } from '@/components/search-async'
import { Slider } from '@/components/ui/slider'
import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/_layout/foods/$food')({
  loader: async ({ params }) => {
    const food = await getFoodBySlug({ data: { slug: params.food } })
    return { food }
  },
  component: FoodDetail,
})

function FoodDetail() {
  const { food: foodSlug } = Route.useParams()
  const { food } = Route.useLoaderData()
  const [servingSize, setServingSize] = React.useState(food?.servingSizeG || 100)

  // Update serving size when navigating to a new food
  React.useEffect(() => {
    if (food?.servingSizeG) {
      setServingSize(food.servingSizeG)
    }
  }, [food?.servingSizeG])

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Food Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the food you're looking for.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  // Calculate nutrition per serving (based on customizable serving size)
  const caloriesPerServing = Math.round((food.caloriesPer100g * servingSize) / 100)
  const proteinPerServing = ((food.proteinPer100g * servingSize) / 100).toFixed(1) + 'g'
  const carbsPerServing = ((food.carbsPer100g * servingSize) / 100).toFixed(1) + 'g'
  const fatsPerServing = ((food.fatsPer100g * servingSize) / 100).toFixed(1) + 'g'
  const fiberPerServing = ((food.fiberPer100g * servingSize) / 100).toFixed(1) + 'g'

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Search Section */}
      <section>
        <div className="container mx-auto px-4 py-6">
          <SearchAsync key={foodSlug} />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold mb-2 text-center md:text-left">{food.name}</h1>
            <img
              src={food.image_url}
              alt={food.name}
              className="w-full rounded-lg shadow-lg object-cover aspect-4/3"
            />
            <p className="text-lg text-muted-foreground text-center md:text-left">
              {food.description}
            </p>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Nutrition Facts */}
            <div className="border-4 border-black bg-white p-2 font-sans max-w-sm mx-auto md:mx-0">
              {/* Header */}
              <div className="border-b-8 border-black pb-1 mb-1">
                <h2 className="text-4xl font-black leading-none">Nutrition Facts</h2>
                <div className="text-sm mt-1 flex items-center gap-2">
                  <span>Serving size</span>
                  <input
                    type="number"
                    value={servingSize}
                    onChange={(e) => setServingSize(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2 py-1 border-2 border-gray-400 rounded text-center font-bold"
                    min="1"
                    max="1000"
                  />
                  <span>g</span>
                  {food.servingSizeUnit && (
                    <span className="text-xs text-gray-600">
                      ({food.servingSizeG}g = {food.servingSizeUnit})
                    </span>
                  )}
                </div>
                {/* Slider */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">1g</span>
                  <Slider
                    value={[servingSize]}
                    onValueChange={(value: number[]) => setServingSize(value[0])}
                    min={1}
                    max={500}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-500 font-medium">500g</span>
                </div>
              </div>

              {/* Amount per serving */}
              <div className="border-b-4 border-black py-1">
                <div className="text-xs font-bold">Amount per serving</div>
              </div>

              {/* Calories */}
              <div className="border-b-4 border-black py-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">Calories {caloriesPerServing}</span>
                  <span className="text-sm">Calories from Fat {Math.round(parseFloat(fatsPerServing) * 9)}</span>
                </div>
              </div>

              {/* Daily Value Header */}
              <div className="border-b border-black py-1">
                <div className="text-sm font-bold text-right">% Daily Value*</div>
              </div>

              {/* Total Fat */}
              <div className="border-b border-black py-1">
                <div className="flex justify-between text-sm">
                  <div><span className="font-bold">Total Fat</span> {fatsPerServing}</div>
                  <div className="font-bold">{Math.round((parseFloat(fatsPerServing) / 78) * 100)}%</div>
                </div>
              </div>

              {/* Saturated Fat - Indented */}
              <div className="border-b border-black py-1 pl-4">
                <div className="flex justify-between text-sm">
                  <div>Saturated Fat 0g</div>
                  <div className="font-bold">0%</div>
                </div>
              </div>

              {/* Trans Fat - Indented */}
              <div className="border-b border-black py-1 pl-4">
                <div className="flex justify-between text-sm">
                  <div><span className="italic">Trans</span> Fat 0g</div>
                  <div></div>
                </div>
              </div>

              {/* Cholesterol */}
              <div className="border-b border-black py-1">
                <div className="flex justify-between text-sm">
                  <div><span className="font-bold">Cholesterol</span> 0mg</div>
                  <div className="font-bold">0%</div>
                </div>
              </div>

              {/* Sodium */}
              <div className="border-b border-black py-1">
                <div className="flex justify-between text-sm">
                  <div><span className="font-bold">Sodium</span> {Math.round((food.sodiumPer100g * servingSize) / 100)}mg</div>
                  <div className="font-bold">{Math.round(((food.sodiumPer100g * servingSize) / 100 / 2300) * 100)}%</div>
                </div>
              </div>

              {/* Total Carbohydrate */}
              <div className="border-b border-black py-1">
                <div className="flex justify-between text-sm">
                  <div><span className="font-bold">Total Carbohydrate</span> {carbsPerServing}</div>
                  <div className="font-bold">{Math.round((parseFloat(carbsPerServing) / 275) * 100)}%</div>
                </div>
              </div>

              {/* Dietary Fiber - Indented */}
              <div className="border-b border-black py-1 pl-4">
                <div className="flex justify-between text-sm">
                  <div>Dietary Fiber {fiberPerServing}</div>
                  <div className="font-bold">{Math.round((parseFloat(fiberPerServing) / 28) * 100)}%</div>
                </div>
              </div>

              {/* Sugars - Indented */}
              <div className="border-b border-black py-1 pl-4">
                <div className="flex justify-between text-sm">
                  <div>Sugars {((food.sugarPer100g * servingSize) / 100).toFixed(0)}g</div>
                  <div></div>
                </div>
              </div>

              {/* Protein */}
              <div className="border-b-8 border-black py-1">
                <div className="text-sm">
                  <span className="font-bold">Protein</span> {proteinPerServing}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t-4 border-black">
                <p className="text-xs leading-tight">
                  * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
