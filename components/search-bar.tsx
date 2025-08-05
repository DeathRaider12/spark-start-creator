import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useState } from "react"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface SearchResult {
    id: string
    title: string
    type: "lesson" | "question" | "course"
    href: string
}

export function SearchBar() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async (searchQuery: string) => {
        setIsLoading(true)
        // Implement your search logic here
        // This is a placeholder for demonstration
        setResults([
            {
                id: "1",
                title: "Introduction to Engineering",
                type: "course",
                href: "/courses/1"
            },
            // Add more results as needed
        ])
        setIsLoading(false)
    }

    return (
        <div className="relative w-full max-w-sm">
            <div className="flex items-center">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="pr-10"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        if (e.target.value.length > 2) {
                            handleSearch(e.target.value)
                        }
                    }}
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-0"
                    onClick={() => handleSearch(query)}
                >
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            {results.length > 0 && (
                <DropdownMenu open={true}>
                    <DropdownMenuContent className="w-full">
                        <DropdownMenuLabel>Search Results</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {results.map((result) => (
                                <DropdownMenuItem key={result.id}>
                                    <a href={result.href} className="flex items-center">
                                        {result.title}
                                        <span className="ml-2 text-xs text-muted-foreground">
                                            {result.type}
                                        </span>
                                    </a>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}
