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

    const allResults: SearchResult[] = [
        {
            id: '1',
            title: 'Margherita Pizza',
            description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
            slug: 'margherita-pizza',
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&h=100&fit=crop',
        },
        {
            id: '2',
            title: 'Cheeseburger',
            description: 'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce',
            slug: 'cheeseburger',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop',
        },
        {
            id: '3',
            title: 'Caesar Salad',
            description: 'Fresh romaine lettuce with parmesan, croutons, and Caesar dressing',
            slug: 'caesar-salad',
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop',
        },
        {
            id: '4',
            title: 'Sushi Platter',
            description: 'Assorted fresh sushi rolls with salmon, tuna, and avocado',
            slug: 'sushi-platter',
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop',
        },
        {
            id: '5',
            title: 'Tacos',
            description: 'Soft corn tortillas filled with seasoned meat, salsa, and cilantro',
            slug: 'tacos',
            image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop',
        },
        {
            id: '6',
            title: 'Pad Thai',
            description: 'Stir-fried rice noodles with shrimp, peanuts, and tangy sauce',
            slug: 'pad-thai',
            image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=100&h=100&fit=crop',
        },
        {
            id: '7',
            title: 'Pasta Carbonara',
            description: 'Creamy Italian pasta with bacon, eggs, and parmesan cheese',
            slug: 'pasta-carbonara',
            image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=100&h=100&fit=crop',
        },
        {
            id: '8',
            title: 'Chicken Tikka Masala',
            description: 'Tender chicken in a rich, creamy tomato-based curry sauce',
            slug: 'chicken-tikka-masala',
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=100&h=100&fit=crop',
        },
        {
            id: '9',
            title: 'Ramen Bowl',
            description: 'Japanese noodle soup with pork, soft-boiled egg, and vegetables',
            slug: 'ramen-bowl',
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100&h=100&fit=crop',
        },
        {
            id: '10',
            title: 'Greek Gyros',
            description: 'Grilled meat wrapped in pita with tzatziki, tomatoes, and onions',
            slug: 'greek-gyros',
            image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=100&h=100&fit=crop',
        },
        {
            id: '11',
            title: 'BBQ Ribs',
            description: 'Slow-cooked pork ribs with smoky barbecue sauce',
            slug: 'bbq-ribs',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100&h=100&fit=crop',
        },
        {
            id: '12',
            title: 'Fried Rice',
            description: 'Wok-fried rice with vegetables, eggs, and soy sauce',
            slug: 'fried-rice',
            image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=100&h=100&fit=crop',
        },
        {
            id: '13',
            title: 'Fish and Chips',
            description: 'Crispy battered fish with golden french fries',
            slug: 'fish-and-chips',
            image: 'https://images.unsplash.com/photo-1579208570378-8c970854bc23?w=100&h=100&fit=crop',
        },
        {
            id: '14',
            title: 'Falafel Wrap',
            description: 'Crispy chickpea fritters with hummus, vegetables, and tahini',
            slug: 'falafel-wrap',
            image: 'https://images.unsplash.com/photo-1593858421991-5c5c4f55aa3a?w=100&h=100&fit=crop',
        },
        {
            id: '15',
            title: 'Chocolate Cake',
            description: 'Rich, moist chocolate cake with creamy chocolate frosting',
            slug: 'chocolate-cake',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop',
        },
    ]

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

