import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Chunk } from './chunk';
import { enhanceChunksWithMetadata } from './chunk_factory';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(""); 
  
  useEffect(() => {
    const storedResults = localStorage.getItem('searchResults');
    const storedSummary = localStorage.getItem('searchSummary');
    console.log("Stored results", storedResults)
    console.log("Stored summary", storedSummary)
    if (storedResults) {
      const enhancedResults = enhanceChunksWithMetadata(JSON.parse(storedResults));
      setResults(enhancedResults);
      localStorage.setItem('searchResults', JSON.stringify(enhancedResults));
    }
    if (storedSummary) {
      // localStorage.setItem('searchSummary', storedSummary)
      setSummary(storedSummary);
      console.log("Stored summary", localStorage.getItem('searchSummary'));
    }
  }, [query]);
  
  return (
    <div className="h-[calc(100vh-7px)] pl-4 w-full flex flex-col pr-4 pt-10 overflow-hidden">
      <div className="flex flex-grow overflow-hidden gap-x-2">
        <div className="w-2/3 pr-4 overflow-y-auto">
          <div className="text-xs">{summary}</div>
        </div>
        <div className='border-r'></div>
        
        <div className="w-1/3 overflow-y-auto ">
          <div className="flex flex-col pb-4 gap-y-4">
            {results.map((chunk, index) => (
              <Chunk 
                key={index} 
                content={chunk.content} 
                metadata={{
                  date: chunk.date,
                  author: chunk.author,
                  filepath: chunk.filepath,
                  tags: chunk.tags,
                  note: chunk.note
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
