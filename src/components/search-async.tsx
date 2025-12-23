import {
    BookOpenIcon,
    FileTextIcon,
    HomeIcon,
    Loader2Icon,
    PackageIcon,
    SearchXIcon,
    SettingsIcon,
    ShoppingCartIcon,
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
    // await new Promise(resolve => setTimeout(resolve, 500))

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
        // Navigate to the result URL
        if (result.url) {
            window.location.href = result.url
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
            placeholder="Search documentation, pages, and more..."
            onSearch={handleSearch}
            onSelect={handleSelect}
            groupByCategory={true}
            className="rounded-lg border shadow-md"
            emptyContent={emptyContent}
        />
    )
}

export default SearchAsync

