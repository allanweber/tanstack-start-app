import { cn } from '@/lib/utils'
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
    badgeText?: string
    onSearch?: (query: string) => void
    onSelect?: (result: SearchResult) => void
    groupByCategory?: boolean
    className?: string
    emptyContent?: React.ReactNode
}

export function Search({
    results = [],
    placeholder = 'Search...',
    badgeText,
    onSearch,
    onSelect,
    groupByCategory = true,
    className,
    emptyContent,
}: SearchProps) {
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    const [inputValue, setInputValue] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Group results by category
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
            window.location.href = result.url
        }
    }

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        setSelectedIndex(-1)
        onSearch?.(value)
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!results.length) return

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault()
            handleSelect(results[selectedIndex])
        }
    }

    // Reset selection when results change
    React.useEffect(() => {
        setSelectedIndex(-1)
    }, [results])

    const hasResults = results.length > 0
    const showContent = hasResults || (emptyContent && !hasResults)

    return (
        <div className={cn("relative", className)}>
            {/* Input wrapper */}
            <div className={cn("bg-white border shadow-sm", showContent ? "rounded-t-3xl" : "rounded-3xl"
            )}>
                {/* Input row */}
                <div className="flex items-center gap-3 px-5 py-3">
                    {badgeText && (
                        <span className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0">
                            {badgeText}
                        </span>
                    )}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="flex h-12 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {/* Empty content (loading or no results) */}
                {!hasResults && emptyContent && (
                    <div className="border-t overflow-hidden">
                        {emptyContent}
                    </div>
                )}

                {/* Results */}
                {hasResults && (
                    <div className="border-t overflow-hidden">
                        <div className="max-h-[400px] overflow-y-auto">
                            {Object.entries(groupedResults).map(([category, categoryResults]) => (
                                <div key={category} className="p-2">
                                    {groupByCategory && (
                                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                                            {category}
                                        </div>
                                    )}
                                    {categoryResults.map((result) => {
                                        const globalIndex = results.findIndex(r => r.id === result.id)
                                        const isSelected = globalIndex === selectedIndex

                                        return (
                                            <button
                                                key={result.id}
                                                onClick={() => handleSelect(result)}
                                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                className={cn(
                                                    "w-full flex items-start gap-3 px-2 py-3 rounded-sm text-left transition-colors",
                                                    isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                                                )}
                                            >
                                                {result.icon || <FileTextIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                                                <div className="flex flex-col gap-1 min-w-0">
                                                    <span className="font-medium text-sm">{result.title}</span>
                                                    {result.description && (
                                                        <span className="text-xs text-muted-foreground line-clamp-2">
                                                            {result.description}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Keyboard shortcuts footer */}
                        <div className="border-t px-4 py-3 bg-muted/30">
                            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-background px-1.5 font-mono font-medium">
                                        <ArrowUpIcon className="h-3 w-3" />
                                        <ArrowDownIcon className="h-3 w-3" />
                                    </kbd>
                                    <span>to navigate</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-background px-1.5 font-mono font-medium">
                                        <CornerDownLeftIcon className="h-3 w-3" />
                                    </kbd>
                                    <span>to select</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
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

