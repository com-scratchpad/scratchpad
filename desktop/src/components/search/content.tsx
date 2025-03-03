import { useEffect } from 'react';
import { Chunk } from './chunk';
import useSummaryStore from '@/stores/summaryStore';
import useChunksStore from '@/stores/chunksStore';
import { format, parseISO } from 'date-fns';

export function SearchPage() {
  const summary = useSummaryStore(state => state.summary);
  const chunks = useChunksStore(state => state.chunks);
  console.log("CHUNKS:", chunks)
  
  return (
    <div className="h-[calc(100vh-7px)] pl-4 w-full flex flex-col pr-4 pt-10 overflow-hidden">
      <div className="flex flex-grow overflow-hidden gap-x-2">
        <div className="w-2/3 pr-4 overflow-y-auto">
          <div className="text-xs">{summary}</div>
        </div>
        <div className='border-r'></div>
        
        <div className="w-1/3 overflow-y-auto ">
          <div className="flex flex-col pb-4 gap-y-4">
            {chunks.map((chunk) => (
              <Chunk 
                key={chunk.id} 
                content={chunk.content}
                metadata={{
                  date: chunk.created_at ? format(parseISO(chunk.created_at), 'MMM d, yyyy h:mm a') : undefined,
                  similarity: `${(chunk.similarity * 100).toFixed(1)}%`,
                  document_id: chunk.document_id,
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
