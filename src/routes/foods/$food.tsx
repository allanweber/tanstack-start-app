import { SearchAsync } from '@/components/search-async'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon, ClockIcon, FireExtinguisherIcon, UsersIcon } from 'lucide-react'

export const Route = createFileRoute('/foods/$food')({
  component: FoodDetail,
})

// Food data with detailed information
const foodData: Record<string, FoodInfo> = {
  'margherita-pizza': {
    slug: 'margherita-pizza',
    title: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop',
    price: '$12.99',
    calories: 250,
    prepTime: '15-20 min',
    servings: 2,
    ingredients: [
      'Pizza dough',
      'San Marzano tomatoes',
      'Fresh mozzarella cheese',
      'Fresh basil leaves',
      'Extra virgin olive oil',
      'Salt and pepper',
    ],
    nutrition: {
      calories: 250,
      protein: '12g',
      carbs: '32g',
      fat: '8g',
      fiber: '2g',
    },
    instructions: [
      'Preheat oven to 475°F (245°C)',
      'Roll out pizza dough on a floured surface',
      'Spread tomato sauce evenly over the dough',
      'Add fresh mozzarella slices',
      'Bake for 12-15 minutes until crust is golden',
      'Top with fresh basil leaves and drizzle with olive oil',
    ],
  },
  'cheeseburger': {
    slug: 'cheeseburger',
    title: 'Cheeseburger',
    description: 'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    price: '$9.99',
    calories: 550,
    prepTime: '20 min',
    servings: 1,
    ingredients: [
      '1/2 lb ground beef',
      'Burger bun',
      'Cheddar cheese',
      'Lettuce',
      'Tomato',
      'Onion',
      'Pickles',
      'Special sauce',
    ],
    nutrition: {
      calories: 550,
      protein: '32g',
      carbs: '42g',
      fat: '28g',
      fiber: '3g',
    },
    instructions: [
      'Form ground beef into patties and season with salt and pepper',
      'Heat grill or pan to medium-high heat',
      'Cook patties for 4-5 minutes per side',
      'Add cheese during last minute of cooking',
      'Toast burger buns',
      'Assemble with lettuce, tomato, onion, pickles, and sauce',
    ],
  },
  'caesar-salad': {
    slug: 'caesar-salad',
    title: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons, and Caesar dressing',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
    price: '$8.99',
    calories: 180,
    prepTime: '10 min',
    servings: 2,
    ingredients: [
      'Romaine lettuce',
      'Parmesan cheese',
      'Croutons',
      'Caesar dressing',
      'Lemon',
      'Black pepper',
    ],
    nutrition: {
      calories: 180,
      protein: '8g',
      carbs: '15g',
      fat: '11g',
      fiber: '3g',
    },
    instructions: [
      'Wash and chop romaine lettuce',
      'Prepare or buy Caesar dressing',
      'Toast bread cubes for croutons',
      'Toss lettuce with dressing',
      'Top with parmesan shavings and croutons',
      'Add fresh black pepper and lemon juice',
    ],
  },
  'sushi-platter': {
    slug: 'sushi-platter',
    title: 'Sushi Platter',
    description: 'Assorted fresh sushi rolls with salmon, tuna, and avocado',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
    price: '$24.99',
    calories: 350,
    prepTime: '45 min',
    servings: 4,
    ingredients: [
      'Sushi rice',
      'Nori sheets',
      'Fresh salmon',
      'Fresh tuna',
      'Avocado',
      'Cucumber',
      'Rice vinegar',
      'Soy sauce',
      'Wasabi',
      'Pickled ginger',
    ],
    nutrition: {
      calories: 350,
      protein: '18g',
      carbs: '52g',
      fat: '8g',
      fiber: '4g',
    },
    instructions: [
      'Cook sushi rice and season with rice vinegar',
      'Prepare fish by slicing into thin strips',
      'Place nori on bamboo mat',
      'Spread rice evenly on nori, leaving a border',
      'Add fish, avocado, and cucumber in the center',
      'Roll tightly and slice into pieces',
      'Serve with soy sauce, wasabi, and ginger',
    ],
  },
  'tacos': {
    slug: 'tacos',
    title: 'Tacos',
    description: 'Soft corn tortillas filled with seasoned meat, salsa, and cilantro',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
    price: '$10.99',
    calories: 200,
    prepTime: '25 min',
    servings: 3,
    ingredients: [
      'Corn tortillas',
      'Ground beef or chicken',
      'Taco seasoning',
      'Salsa',
      'Fresh cilantro',
      'Lime',
      'Onion',
      'Cheese',
    ],
    nutrition: {
      calories: 200,
      protein: '15g',
      carbs: '22g',
      fat: '7g',
      fiber: '3g',
    },
    instructions: [
      'Cook ground meat with taco seasoning',
      'Warm tortillas in a pan or microwave',
      'Fill tortillas with cooked meat',
      'Top with salsa, onion, cilantro, and cheese',
      'Squeeze lime juice over tacos',
      'Serve immediately',
    ],
  },
  'pad-thai': {
    slug: 'pad-thai',
    title: 'Pad Thai',
    description: 'Stir-fried rice noodles with shrimp, peanuts, and tangy sauce',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    price: '$13.99',
    calories: 400,
    prepTime: '30 min',
    servings: 2,
    ingredients: [
      'Rice noodles',
      'Shrimp',
      'Eggs',
      'Bean sprouts',
      'Peanuts',
      'Green onions',
      'Tamarind paste',
      'Fish sauce',
      'Palm sugar',
      'Lime',
    ],
    nutrition: {
      calories: 400,
      protein: '22g',
      carbs: '55g',
      fat: '12g',
      fiber: '4g',
    },
    instructions: [
      'Soak rice noodles in warm water',
      'Make sauce with tamarind, fish sauce, and sugar',
      'Stir-fry shrimp until pink',
      'Push aside and scramble eggs',
      'Add drained noodles and sauce',
      'Toss with bean sprouts and green onions',
      'Garnish with crushed peanuts and lime',
    ],
  },
  'pasta-carbonara': {
    slug: 'pasta-carbonara',
    title: 'Pasta Carbonara',
    description: 'Creamy Italian pasta with bacon, eggs, and parmesan cheese',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop',
    price: '$11.99',
    calories: 450,
    prepTime: '20 min',
    servings: 2,
    ingredients: [
      'Spaghetti',
      'Bacon or pancetta',
      'Eggs',
      'Parmesan cheese',
      'Black pepper',
      'Garlic',
      'Salt',
    ],
    nutrition: {
      calories: 450,
      protein: '24g',
      carbs: '48g',
      fat: '18g',
      fiber: '3g',
    },
    instructions: [
      'Cook pasta according to package directions',
      'Fry bacon until crispy, reserve some pasta water',
      'Beat eggs with parmesan cheese',
      'Toss hot pasta with bacon',
      'Remove from heat and add egg mixture',
      'Stir quickly, adding pasta water to create creamy sauce',
      'Season with black pepper',
    ],
  },
  'chicken-tikka-masala': {
    slug: 'chicken-tikka-masala',
    title: 'Chicken Tikka Masala',
    description: 'Tender chicken in a rich, creamy tomato-based curry sauce',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop',
    price: '$14.99',
    calories: 380,
    prepTime: '45 min',
    servings: 4,
    ingredients: [
      'Chicken breast',
      'Yogurt',
      'Garam masala',
      'Tomato sauce',
      'Heavy cream',
      'Onion',
      'Garlic',
      'Ginger',
      'Turmeric',
      'Cumin',
    ],
    nutrition: {
      calories: 380,
      protein: '32g',
      carbs: '18g',
      fat: '20g',
      fiber: '3g',
    },
    instructions: [
      'Marinate chicken in yogurt and spices for 30 minutes',
      'Grill or pan-fry chicken until cooked',
      'Sauté onion, garlic, and ginger',
      'Add spices and tomato sauce',
      'Stir in cream and simmer',
      'Add chicken pieces and cook for 10 minutes',
      'Serve with rice or naan bread',
    ],
  },
  'ramen-bowl': {
    slug: 'ramen-bowl',
    title: 'Ramen Bowl',
    description: 'Japanese noodle soup with pork, soft-boiled egg, and vegetables',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    price: '$12.99',
    calories: 420,
    prepTime: '35 min',
    servings: 2,
    ingredients: [
      'Ramen noodles',
      'Pork belly',
      'Eggs',
      'Green onions',
      'Nori seaweed',
      'Soy sauce',
      'Miso paste',
      'Chicken broth',
      'Sesame oil',
    ],
    nutrition: {
      calories: 420,
      protein: '28g',
      carbs: '45g',
      fat: '15g',
      fiber: '4g',
    },
    instructions: [
      'Prepare broth by simmering chicken stock with miso',
      'Cook pork belly until crispy',
      'Soft-boil eggs for 7 minutes',
      'Cook ramen noodles according to package',
      'Assemble bowl with noodles and hot broth',
      'Top with sliced pork, halved eggs, green onions, and nori',
    ],
  },
  'greek-gyros': {
    slug: 'greek-gyros',
    title: 'Greek Gyros',
    description: 'Grilled meat wrapped in pita with tzatziki, tomatoes, and onions',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop',
    price: '$10.99',
    calories: 380,
    prepTime: '30 min',
    servings: 2,
    ingredients: [
      'Pita bread',
      'Lamb or chicken',
      'Greek yogurt',
      'Cucumber',
      'Garlic',
      'Tomatoes',
      'Red onion',
      'Lemon',
      'Oregano',
    ],
    nutrition: {
      calories: 380,
      protein: '26g',
      carbs: '38g',
      fat: '14g',
      fiber: '3g',
    },
    instructions: [
      'Marinate meat in lemon, garlic, and oregano',
      'Make tzatziki by mixing yogurt, cucumber, and garlic',
      'Grill or pan-fry meat until cooked',
      'Warm pita bread',
      'Slice meat and assemble in pita',
      'Add tzatziki, tomatoes, and onions',
    ],
  },
  'bbq-ribs': {
    slug: 'bbq-ribs',
    title: 'BBQ Ribs',
    description: 'Slow-cooked pork ribs with smoky barbecue sauce',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
    price: '$18.99',
    calories: 600,
    prepTime: '2-3 hours',
    servings: 4,
    ingredients: [
      'Pork ribs',
      'BBQ sauce',
      'Brown sugar',
      'Paprika',
      'Garlic powder',
      'Onion powder',
      'Black pepper',
      'Salt',
    ],
    nutrition: {
      calories: 600,
      protein: '42g',
      carbs: '24g',
      fat: '38g',
      fiber: '1g',
    },
    instructions: [
      'Remove membrane from ribs',
      'Rub ribs with spice mixture',
      'Wrap in foil and bake at 275°F for 2.5 hours',
      'Unwrap and brush with BBQ sauce',
      'Increase temperature to 375°F',
      'Bake for 30 more minutes until caramelized',
    ],
  },
  'fried-rice': {
    slug: 'fried-rice',
    title: 'Fried Rice',
    description: 'Wok-fried rice with vegetables, eggs, and soy sauce',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    price: '$8.99',
    calories: 320,
    prepTime: '20 min',
    servings: 3,
    ingredients: [
      'Cooked rice (day-old)',
      'Eggs',
      'Mixed vegetables',
      'Soy sauce',
      'Sesame oil',
      'Green onions',
      'Garlic',
      'Ginger',
    ],
    nutrition: {
      calories: 320,
      protein: '12g',
      carbs: '52g',
      fat: '8g',
      fiber: '3g',
    },
    instructions: [
      'Heat wok or large pan over high heat',
      'Scramble eggs and set aside',
      'Stir-fry vegetables until tender',
      'Add cold rice and break up clumps',
      'Season with soy sauce and sesame oil',
      'Add eggs back and toss everything',
      'Garnish with green onions',
    ],
  },
  'fish-and-chips': {
    slug: 'fish-and-chips',
    title: 'Fish and Chips',
    description: 'Crispy battered fish with golden french fries',
    image: 'https://images.unsplash.com/photo-1579208570378-8c970854bc23?w=800&h=600&fit=crop',
    price: '$13.99',
    calories: 520,
    prepTime: '35 min',
    servings: 2,
    ingredients: [
      'White fish fillets',
      'Potatoes',
      'Flour',
      'Beer',
      'Baking powder',
      'Salt',
      'Lemon',
      'Tartar sauce',
    ],
    nutrition: {
      calories: 520,
      protein: '32g',
      carbs: '54g',
      fat: '20g',
      fiber: '4g',
    },
    instructions: [
      'Cut potatoes into fries and soak in water',
      'Make batter with flour, beer, and baking powder',
      'Heat oil to 350°F',
      'Dry fish and coat in batter',
      'Fry fish until golden brown',
      'Fry potatoes until crispy',
      'Serve with lemon wedges and tartar sauce',
    ],
  },
  'falafel-wrap': {
    slug: 'falafel-wrap',
    title: 'Falafel Wrap',
    description: 'Crispy chickpea fritters with hummus, vegetables, and tahini',
    image: 'https://images.unsplash.com/photo-1593858421991-5c5c4f55aa3a?w=800&h=600&fit=crop',
    price: '$9.99',
    calories: 340,
    prepTime: '30 min',
    servings: 2,
    ingredients: [
      'Chickpeas',
      'Parsley',
      'Garlic',
      'Cumin',
      'Pita bread',
      'Hummus',
      'Lettuce',
      'Tomatoes',
      'Tahini sauce',
    ],
    nutrition: {
      calories: 340,
      protein: '14g',
      carbs: '48g',
      fat: '12g',
      fiber: '10g',
    },
    instructions: [
      'Blend chickpeas, parsley, garlic, and spices',
      'Form mixture into small balls',
      'Fry or bake falafel until crispy',
      'Warm pita bread',
      'Spread hummus on pita',
      'Add falafel, vegetables, and tahini',
      'Wrap and serve',
    ],
  },
  'chocolate-cake': {
    slug: 'chocolate-cake',
    title: 'Chocolate Cake',
    description: 'Rich, moist chocolate cake with creamy chocolate frosting',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
    price: '$6.99',
    calories: 450,
    prepTime: '1 hour',
    servings: 8,
    ingredients: [
      'Flour',
      'Cocoa powder',
      'Sugar',
      'Eggs',
      'Butter',
      'Milk',
      'Vanilla extract',
      'Baking powder',
      'Chocolate chips',
    ],
    nutrition: {
      calories: 450,
      protein: '6g',
      carbs: '62g',
      fat: '22g',
      fiber: '3g',
    },
    instructions: [
      'Preheat oven to 350°F',
      'Mix dry ingredients in a bowl',
      'Beat butter and sugar until fluffy',
      'Add eggs one at a time',
      'Alternate adding dry ingredients and milk',
      'Pour into greased pan and bake 30-35 minutes',
      'Cool completely and frost with chocolate frosting',
    ],
  },
}

interface FoodInfo {
  slug: string
  title: string
  description: string
  image: string
  price: string
  calories: number
  prepTime: string
  servings: number
  ingredients: string[]
  nutrition: {
    calories: number
    protein: string
    carbs: string
    fat: string
    fiber: string
  }
  instructions: string[]
}

function FoodDetail() {
  const { food: foodSlug } = Route.useParams()
  const navigate = useNavigate()
  const food = foodData[foodSlug]

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Food Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the food you're looking for.
          </p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate({ to: '/' })}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Search Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <SearchAsync key={foodSlug} />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <img
              src={food.image}
              alt={food.title}
              className="w-full rounded-lg shadow-lg object-cover aspect-4/3"
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <ClockIcon className="h-5 w-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{food.prepTime}</span>
                <span className="text-xs text-muted-foreground">Prep Time</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <FireExtinguisherIcon className="h-5 w-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{food.calories} cal</span>
                <span className="text-xs text-muted-foreground">Calories</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <UsersIcon className="h-5 w-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{food.servings}</span>
                <span className="text-xs text-muted-foreground">Servings</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{food.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {food.description}
              </p>
              <div className="text-3xl font-bold text-primary">{food.price}</div>
            </div>

            {/* Nutrition Facts */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3">Nutrition Facts</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Calories</span>
                  <span className="font-medium">{food.nutrition.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protein</span>
                  <span className="font-medium">{food.nutrition.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carbs</span>
                  <span className="font-medium">{food.nutrition.carbs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fat</span>
                  <span className="font-medium">{food.nutrition.fat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fiber</span>
                  <span className="font-medium">{food.nutrition.fiber}</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
              <ul className="space-y-2">
                {food.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {food.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <p className="pt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  )
}
