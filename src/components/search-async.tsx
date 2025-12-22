import {
    AlertCircleIcon,
    BookOpenIcon,
    FileTextIcon,
    HomeIcon,
    Loader2Icon,
    PackageIcon,
    SearchIcon,
    SearchXIcon,
    SettingsIcon,
    ShoppingCartIcon,
    SparklesIcon,
    UserIcon
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
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // This is mock data. In production, replace with:
    // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    // return response.json()

    const allResults: SearchResult[] = [
        {
            id: '1',
            title: 'Getting Started Guide',
            description: 'Learn how to set up and configure your application with our comprehensive guide',
            category: 'Documentation',
            url: '/docs/getting-started',
            icon: <BookOpenIcon className="h-4 w-4" />,
        },
        {
            id: '2',
            title: 'Home Page',
            description: 'Navigate to the home page and explore our features',
            category: 'Pages',
            url: '/',
            icon: <HomeIcon className="h-4 w-4" />,
        },
        {
            id: '3',
            title: 'User Settings',
            description: 'Manage your account settings and preferences',
            category: 'Settings',
            url: '/settings',
            icon: <SettingsIcon className="h-4 w-4" />,
        },
        {
            id: '4',
            title: 'User Profile',
            description: 'View and edit your profile information',
            category: 'User',
            url: '/profile',
            icon: <UserIcon className="h-4 w-4" />,
        },
        {
            id: '5',
            title: 'Products Catalog',
            description: 'Browse our complete product catalog',
            category: 'Shopping',
            url: '/products',
            icon: <PackageIcon className="h-4 w-4" />,
        },
        {
            id: '6',
            title: 'Shopping Cart',
            description: 'View items in your shopping cart and proceed to checkout',
            category: 'Shopping',
            url: '/cart',
            icon: <ShoppingCartIcon className="h-4 w-4" />,
        },
        {
            id: '7',
            title: 'API Documentation',
            description: 'Learn about available API endpoints and usage examples',
            category: 'Documentation',
            url: '/docs/api',
            icon: <FileTextIcon className="h-4 w-4" />,
        },
        {
            id: '8',
            title: 'Component Library',
            description: 'Explore available UI components and their implementations',
            category: 'Documentation',
            url: '/docs/components',
            icon: <PackageIcon className="h-4 w-4" />,
        },
        {
            id: '9',
            title: 'Authentication',
            description: 'Learn about authentication and authorization',
            category: 'Documentation',
            url: '/docs/auth',
            icon: <UserIcon className="h-4 w-4" />,
        },
        {
            id: '10',
            title: 'Deployment Guide',
            description: 'Deploy your application to production',
            category: 'Documentation',
            url: '/docs/deployment',
            icon: <BookOpenIcon className="h-4 w-4" />,
        },
    ]

    // Filter results based on query
    const lowerQuery = query.toLowerCase()
    return allResults.filter(
        result =>
            result.title.toLowerCase().includes(lowerQuery) ||
            result.description?.toLowerCase().includes(lowerQuery) ||
            result.category?.toLowerCase().includes(lowerQuery)
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
    const [query, setQuery] = React.useState('')
    const [results, setResults] = React.useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
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
            setError(null)
            setHasSearched(true)

            try {
                const data = await searchAPI(debouncedQuery)
                setResults(data)
            } catch (err) {
                console.error('Search error:', err)
                setError('Failed to fetch search results. Please try again.')
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
        // Navigate to the result URL
        if (result.url) {
            window.location.href = result.url
        }
    }

    // Show appropriate empty text and icon based on state
    const { emptyText, emptyIcon } = React.useMemo(() => {
        // User hasn't typed anything yet
        if (query.length === 0) {
            return {
                emptyText: 'Start typing to search...',
                emptyIcon: <SparklesIcon className="h-12 w-12" />
            }
        }

        // User typed 1-2 characters
        if (query.length > 0 && query.length < 3) {
            return {
                emptyText: 'Type at least 3 characters to search...',
                emptyIcon: <SearchIcon className="h-12 w-12" />
            }
        }

        // Currently searching
        if (isLoading) {
            return {
                emptyText: 'Searching...',
                emptyIcon: <Loader2Icon className="h-12 w-12 animate-spin" />
            }
        }

        // Error occurred
        if (error) {
            return {
                emptyText: error,
                emptyIcon: <AlertCircleIcon className="h-12 w-12" />
            }
        }

        // Search was executed but no results found
        if (hasSearched && results.length === 0) {
            return {
                emptyText: 'No results found. Try a different search term.',
                emptyIcon: <SearchXIcon className="h-12 w-12" />
            }
        }

        // Default fallback
        return {
            emptyText: 'Start typing to search...',
            emptyIcon: <SparklesIcon className="h-12 w-12" />
        }
    }, [query.length, isLoading, error, hasSearched, results.length])

    return (
        <Search
            results={results}
            placeholder="Search documentation, pages, and more..."
            buttonText="Search"
            onSearch={handleSearch}
            onSelect={handleSelect}
            emptyText={emptyText}
            emptyIcon={emptyIcon}
            groupByCategory={true}
        />
    )
}

export default SearchAsync

