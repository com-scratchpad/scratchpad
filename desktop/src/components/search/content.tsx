import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import SignOutButton from '../sidebar/signout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, File } from "lucide-react";
import { searchDocuments } from '@/api/document';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchDocuments(searchQuery);
      if (results && results.results) {
        setSearchResults(results.results);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="h-[calc(100vh-7px)] pl-4 w-full flex flex-col pr-4 pt-10 overflow-hidden">
      {/* Add search bar in the middle */}
      <div className="flex justify-center mb-8">
        <div className="w-2/3 flex gap-2">
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <span className="animate-spin mr-2">⟳</span>
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Search
          </Button>
        </div>
      </div>
      
      <div className="flex flex-grow overflow-hidden gap-x-2">
        <div className="w-2/3 pr-4 overflow-y-auto">
          {/* Display search results */}
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="grid gap-4">
              {searchResults.map((doc, index) => (
                <div key={index} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    {doc.file_type === 'txt' ? (
                      <FileText className="h-5 w-5 text-blue-500" />
                    ) : (
                      <File className="h-5 w-5 text-gray-500" />
                    )}
                    <h3 className="font-medium">{doc.name}</h3>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {doc.content && (
                      <p className="line-clamp-2">{doc.content}</p>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {doc.created_at && (
                      <p>Created: {format(new Date(doc.created_at), 'MMM d, yyyy')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No documents found. Try a different search term.</p>
          )}
        </div>
        <div className='border-r'></div>
        
        <div className="w-1/3 overflow-y-auto">
          <div className="flex flex-col pb-4 gap-y-4">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
