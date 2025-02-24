import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/tiptap/Tiptap";
import { SearchBar } from "@/components/search/SearchBar";
import { PlugButton } from "@/components/plug/PlugButton";
import { ChunkList } from "@/components/chunks/ChunkList";
import { AppSidebar } from "@/components/sidebar/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import clsx from "clsx";
import { SaveButton } from '@/components/save/SaveButton';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [isOpen, setIsOpen] = useState(true);

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
    <SidebarProvider
      open={isOpen}
      onOpenChange={setIsOpen}
      style={{
        "--sidebar-width": "19rem",
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header
          className={clsx("flex h-10 shrink-0 ml-16 items-center gap-2 px-3", {
            "-ml-1": isOpen,
          })}
        >
          <SidebarTrigger size="icon_sm" className="-ml-1 transition-all" />
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <SaveButton title= "Summary" content = ""/>
            <PlugButton />
          </div>
        </header>

        <div className="flex h-[calc(100%-2.5rem)]">
          <div className="w-[400px] border-r">
            <ChunkList chunks={results} />
          </div>
          
          <div className="flex-1 p-4">
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
      </SidebarInset>
    </SidebarProvider>
  );
}
