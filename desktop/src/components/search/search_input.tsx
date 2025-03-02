import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { Loader2 } from "lucide-react"
import { useId, useState } from "react";
import { getToken } from '@/lib/stronghold';
 
export function SearchInput() {
  const id = useId();

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSummary, setCurrentSummary] = useState("");
  
  const handleSearch = async () => {
    setIsLoading(true);
    if (query.trim()) {
      try {
        const token = await getToken();
        const response = await fetch('http://localhost:8000/secure/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: query, 
            matches: 5
          })
        });

        console.log("Search response status:", response.status); // Debug response status

        if (response.ok) {
          const data = await response.json();
          console.log("Search response data:", data); // Debug full response data
          
          if (!data.chunks || data.chunks.length === 0) {
            console.log("No results found for query");
            return;
          }

          setSearchResults(data.chunks);
          localStorage.setItem('searchResults', JSON.stringify(data.chunks));
          
          const textContents = data.chunks.map((chunk: { content: string; id: string }) => chunk.content);

          const summaryResponse = await fetch('http://localhost:8000/secure/summarize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              'chunks': textContents,
              'name': `Search: ${query}`
            })
          });
          setIsLoading(false);

          if (summaryResponse.ok) {

            const summaryData = await summaryResponse.json();
            console.log("SUMMARY DATA", summaryData.summary)
            setCurrentSummary(summaryData.summary);
            localStorage.setItem('searchSummary', summaryData.summary);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Search or summarize failed:', error);
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="*:not-first:mt-2 pt-8">
        <div className="flex rounded-md shadow-xs">
          <Input
          id={id}
          onChange={(e) => setQuery(e.target.value)}
          className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
          placeholder="Search"
          type="text"
          onKeyDown={handleKeyDown}
        />
          <button
          className="border-input bg-transparent text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-9 items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Subscribe"
        >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14}/>}
          </button>
        </div>
      </div>
  )
}
