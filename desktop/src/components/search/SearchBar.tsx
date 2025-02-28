import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { SearchButton } from "./SearchButton";
import { getToken } from '@/lib/stronghold';

interface SearchBarProps {
  alwaysOpen: boolean;
  showToggle: boolean;
}

export function SearchBar({ alwaysOpen, showToggle }: SearchBarProps) {
  const [showSearch, setShowSearch] = useState(alwaysOpen);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSummary, setCurrentSummary] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
          try {
        localStorage.setItem("searchTerm", searchQuery);

        const response = await fetch('http://localhost:8000/secure/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
          },
          body: JSON.stringify({
            query: searchQuery, 
            matches: 5
          })
        });

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.chunks);
          localStorage.setItem('searchResults', JSON.stringify(data.chunks));

          const textContents = data.chunks.map((chunk: { content: string; id: string }) => chunk.content);

          const summaryResponse = await fetch('http://localhost:8000/secure/summarize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
              'chunks': textContents,
              'name': `Search: ${searchQuery}`
            })
          });

          if (summaryResponse.ok) {
            const summaryData = await summaryResponse.json();
            setCurrentSummary(summaryData.summary);
            localStorage.setItem('searchSummary', summaryData.summary);
          }

          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
          setShowSearch(false);
          setSearchQuery("");
        }
      } catch (error) {
        console.error('Search or summarize failed:', error);
      }
    }
  };

  const handleSearchSubmit = async () => {
    if (searchQuery.trim()) {
      try {
        const token = await getToken();
        const response = await fetch('http://localhost:8000/secure/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: searchQuery, 
            matches: 5
          })
        });

        if (response.ok) {
          const data = await response.json();
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
              'name': `Search: ${searchQuery}`
            })
          });

          if (summaryResponse.ok) {
            const summaryData = await summaryResponse.json();
            setCurrentSummary(summaryData.summary);
            localStorage.setItem('searchSummary', summaryData.summary);
          }

          try {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
          } catch (navigationError) {
            console.error('Navigation failed:', navigationError);
          }
        }
      } catch (error) {
        console.error('Search or summarize failed:', error);
      }
    }
  };

  return (
    <div className="flex items-center" ref={searchContainerRef}>
      <div className="flex-1 mr-1">
        {(alwaysOpen) && (
          <Input
            placeholder="Search..."
            className="h-6 w-[200px] text-sm"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
          />
        )}
      </div>
      <SearchButton 
        showToggle={showToggle}
        onToggle={() => setShowSearch(!showSearch)}
        onSearch={handleSearchSubmit}
        navigateOnly={false}
      />
    </div>
  );
}
