import foodsData from '@/data/foods.json'
import type { Food } from '@/types/food'
import { createServerFn } from '@tanstack/react-start'


// Get a single food by slug
export const getFoodBySlug = createServerFn({ method: 'GET' })
    .inputValidator((data: { slug: string }) => data)
    .handler(async ({ data }) => {
        const foods = foodsData as Food[]
        const food = foods.find((f) => f.slug === data.slug)
        return food || null
    })

// Search foods by query
export const searchFoods = createServerFn({ method: 'GET' })
    .inputValidator((data: { query: string }) => data)
    .handler(async ({ data }) => {
        const foods = foodsData as Food[]
        const query = data.query.toLowerCase()

        if (!query) {
            return foods.slice(0, 10) // Return first 10 if no query
        }

        return foods.filter(
            (food) =>
                food.name.toLowerCase().includes(query) ||
                food.description?.toLowerCase().includes(query)
        )
    })
