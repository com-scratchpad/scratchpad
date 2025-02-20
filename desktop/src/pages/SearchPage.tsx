import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/tiptap/Tiptap";
import { SearchBar } from "@/components/search/SearchBar";
import { SaveButton } from "@/components/save/SaveButton";
import { PlugButton } from "@/components/plug/PlugButton";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const storedResults = localStorage.getItem('searchResults');
    const storedSummary = localStorage.getItem('searchSummary');
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    if (storedSummary) {
      setSummary(storedSummary);
    }
  }, [query]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex p-4 gap-4 flex-1">
        {isMenuOpen && (
          <div className="w-1/4 overflow-y-auto border-r pr-4">
            <h2 className="text-base font-semibold mb-4 text-center">Search Results</h2>
            <div className="space-y-4">
              {results.map((result: any) => (
                <div key={result.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <p className="text-sm">{result.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 max-w-3xl mx-auto relative">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <SearchBar />
              <SaveButton />
              <PlugButton />
            </div>
          </div>

          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Summary</h1>
          </div>

          <div className="mt-2">
            <Tiptap 
              initialContent={summary} 
              placeholder="Edit your summary..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}