import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { ArrowDownIcon, ArrowUpIcon, CornerDownLeftIcon, FileTextIcon } from 'lucide-react'
import * as React from 'react'

// Types for search results
export interface SearchResult {
    id: string
    title: string
    description?: string
    category?: string
    url?: string
    icon?: React.ReactNode
}

export interface SearchProps {
    results?: SearchResult[]
    placeholder?: string
    onSearch?: (query: string) => void
    onSelect?: (result: SearchResult) => void
    groupByCategory?: boolean
    className?: string
    emptyContent?: React.ReactNode
}

export function Search({
    results = [],
    placeholder = 'Search...',
    onSearch,
    onSelect,
    groupByCategory = true,
    className,
    emptyContent,
}: SearchProps) {
    // Group results by category
    // Note: We don't need to filter here because cmdk handles filtering for us
    const groupedResults = React.useMemo(() => {
        if (!groupByCategory) {
            return { 'Results': results }
        }

        const groups: Record<string, SearchResult[]> = {}
        results.forEach((result) => {
            const category = result.category || 'Other'
            if (!groups[category]) {
                groups[category] = []
            }
            groups[category].push(result)
        })
        return groups
    }, [results, groupByCategory])

    // Handle result selection
    const handleSelect = (result: SearchResult) => {
        if (onSelect) {
            onSelect(result)
        } else if (result.url) {
            // Default behavior: navigate to URL
            window.location.href = result.url
        }
    }

    // Only show results if there are any
    const hasResults = results.length > 0

    return (
        <Command className={className}>
            <CommandInput
                placeholder={placeholder}
                onValueChange={onSearch}
            />

            {/* Show empty content (loading or no results) */}
            {!hasResults && emptyContent && (
                <div className="border-t">
                    {emptyContent}
                </div>
            )}

            {/* Show results */}
            {hasResults && (
                <>
                    <CommandList>
                        {Object.entries(groupedResults).map(([category, categoryResults]) => (
                            <CommandGroup key={category} heading={category}>
                                {categoryResults.map((result) => {
                                    // Create a searchable value from title, description, and category
                                    const searchValue = [
                                        result.title,
                                        result.description,
                                        result.category
                                    ].filter(Boolean).join(' ')

                                    return (
                                        <CommandItem
                                            key={result.id}
                                            value={searchValue}
                                            onSelect={() => handleSelect(result)}
                                            className="flex items-start gap-3"
                                        >
                                            {result.icon || <FileTextIcon className="mt-0.5 h-4 w-4" />}
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium">{result.title}</span>
                                                {result.description && (
                                                    <span className="text-xs text-muted-foreground line-clamp-2">
                                                        {result.description}
                                                    </span>
                                                )}
                                            </div>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        ))}
                    </CommandList>

                    {/* Keyboard shortcuts footer */}
                    <div className="border-t px-4 py-3">
                        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium">
                                    <ArrowUpIcon className="h-3 w-3" />
                                    <ArrowDownIcon className="h-3 w-3" />
                                </kbd>
                                <span>to navigate</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium">
                                    <CornerDownLeftIcon className="h-3 w-3" />
                                </kbd>
                                <span>to select</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Command>
    )
}

// Example hook for using search with async data
export function useSearch(searchFn: (query: string) => Promise<SearchResult[]>) {
    const [results, setResults] = React.useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSearch = React.useCallback(
        async (query: string) => {
            if (!query) {
                setResults([])
                return
            }

            setIsLoading(true)
            try {
                const data = await searchFn(query)
                setResults(data)
            } catch (error) {
                console.error('Search error:', error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        },
        [searchFn]
    )

    return { results, isLoading, handleSearch }
}

// Export default
export default Search

