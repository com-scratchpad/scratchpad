import { useEffect, useState } from 'react';
import useSummaryStore from '@/stores/summaryStore';
import useChunksStore from '@/stores/chunksStore';
import { format, parseISO } from 'date-fns';
import SignOutButton from '../sidebar/signout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchPage() {

  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
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
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      <div className="flex flex-grow overflow-hidden gap-x-2">
        <div className="w-2/3 pr-4 overflow-y-auto">
          <SignOutButton />
        </div>
        <div className='border-r'></div>
        
        <div className="w-1/3 overflow-y-auto ">
          <div className="flex flex-col pb-4 gap-y-4">
            
          </div>
        </div>
      </div>
    </div>
  );
}
