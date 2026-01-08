import foodsData from '@/data/foods.json'
import type { Food } from '@/types/food'
import { useNavigate } from '@tanstack/react-router'
import {
    Loader2Icon,
    SearchXIcon
} from 'lucide-react'
import * as React from 'react'
import { Search, SearchResult } from './search'

/**
 * Advanced example: Async search with debouncing
 * This component demonstrates how to:
 * - Fetch search results from an API
 * - Debounce search queries
 * - Handle loading and error states
 */

// Simulated API call - replace with your actual API endpoint
async function searchAPI(query: string): Promise<SearchResult[]> {

    // Convert Food data to SearchResult format
    const allResults: SearchResult[] = (foodsData as Food[]).map(food => ({
        id: food.id?.toString() || food.slug || '',
        title: food.name,
        description: food.description,
        slug: food.slug,
        image: food.image_url ? food.image_url.replace('w=800&h=600', 'w=100&h=100') : undefined,
    }))

    // Filter results based on query
    const lowerQuery = query.toLowerCase()
    return allResults.filter(
        result =>
            result.title.toLowerCase().includes(lowerQuery) ||
            result.description?.toLowerCase().includes(lowerQuery)
    )
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export function SearchAsync() {
    const navigate = useNavigate()
    const [query, setQuery] = React.useState('')
    const [results, setResults] = React.useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [hasSearched, setHasSearched] = React.useState(false)

    // Debounce the search query to avoid too many API calls
    const debouncedQuery = useDebounce(query, 300)

    // Fetch results when debounced query changes
    React.useEffect(() => {
        // Clear results if query is empty
        if (!debouncedQuery) {
            setResults([])
            setIsLoading(false)
            setHasSearched(false)
            return
        }

        // Require minimum 3 characters
        if (debouncedQuery.length < 3) {
            setResults([])
            setIsLoading(false)
            setHasSearched(false)
            return
        }

        const fetchResults = async () => {
            setIsLoading(true)
            setHasSearched(true)

            try {
                const data = await searchAPI(debouncedQuery)
                setResults(data)
            } catch (err) {
                console.error('Search error:', err)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchResults()
    }, [debouncedQuery])

    const handleSearch = (newQuery: string) => {
        setQuery(newQuery)
    }

    const handleSelect = (result: SearchResult) => {
        console.log('Selected:', result)
        // Clear search state
        setQuery('')
        setResults([])
        setIsLoading(false)
        setHasSearched(false)
        // Navigate to the food detail page
        if (result.slug) {
            navigate({ to: '/foods/$food', params: { food: result.slug } })
        }
    }


    // Determine what to show in the empty state
    const emptyContent = React.useMemo(() => {
        // Loading state
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center gap-3 py-8">
                    <Loader2Icon className="h-12 w-12 animate-spin text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">Searching...</p>
                </div>
            )
        }

        // No results state (only show after search was executed)
        if (hasSearched && results.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center gap-3 py-8">
                    <SearchXIcon className="h-12 w-12 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">No results found. Try a different search term.</p>
                </div>
            )
        }

        return null
    }, [isLoading, hasSearched, results.length])

    return (
        <Search
            results={results}
            placeholder="Search for your favorite food or meal"
            badgeText="Search Foods"
            onSearch={handleSearch}
            onSelect={handleSelect}
            emptyContent={emptyContent}
        />
    )
}

export default SearchAsync

