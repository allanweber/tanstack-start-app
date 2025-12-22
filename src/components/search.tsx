import { Button } from '@/components/ui/button'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'
import { ArrowDownIcon, ArrowUpIcon, CornerDownLeftIcon, FileTextIcon, SearchIcon } from 'lucide-react'
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
    buttonText?: string
    onSearch?: (query: string) => void
    onSelect?: (result: SearchResult) => void
    emptyText?: string
    emptyIcon?: React.ReactNode
    groupByCategory?: boolean
}

export function Search({
    results = [],
    placeholder = 'Search...',
    buttonText = 'Search',
    onSearch,
    onSelect,
    emptyText = 'No results found.',
    emptyIcon,
    groupByCategory = true,
}: SearchProps) {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState('')

    // Keyboard shortcut: Cmd+K (Mac) / Ctrl+K (Windows/Linux)
    useKeyboardShortcut('k', () => setOpen(true), { ctrl: true, meta: true })

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

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setQuery(value)
        onSearch?.(value)
    }

    // Handle result selection
    const handleSelect = (result: SearchResult) => {
        setOpen(false)
        setQuery('')

        if (onSelect) {
            onSelect(result)
        } else if (result.url) {
            // Default behavior: navigate to URL
            window.location.href = result.url
        }
    }

    // Detect OS for keyboard shortcut display
    const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const shortcutKey = isMac ? '⌘' : 'Ctrl'

    return (
        <>
            {/* Search trigger button */}
            <Button
                variant="outline"
                className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setOpen(true)}
            >
                <SearchIcon className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline-flex">{buttonText}</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">{shortcutKey}</span>K
                </kbd>
            </Button>

            {/* Search dialog/modal */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder={placeholder}
                    value={query}
                    onValueChange={handleSearchChange}
                />
                <CommandList>
                    <CommandEmpty>
                        <div className="flex flex-col items-center justify-center gap-3 py-8">
                            {emptyIcon && (
                                <div className="text-muted-foreground/50">
                                    {emptyIcon}
                                </div>
                            )}
                            <p className="text-sm text-muted-foreground">{emptyText}</p>
                        </div>
                    </CommandEmpty>

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
                        <div className="flex items-center gap-1.5">
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                                ESC
                            </kbd>
                            <span>to close</span>
                        </div>
                    </div>
                </div>
            </CommandDialog>
        </>
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

