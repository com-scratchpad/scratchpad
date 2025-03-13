import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command";
  import { Panel, usePanelStore } from "@/stores/commandStore";
  import { CaseSensitive, CircleCheck } from "lucide-react";
  import * as React from "react";
  import { DatePickerWithRange } from "../ui/datepicker";
  import { Input } from "../ui/input";
  import { useNavigate } from "react-router-dom";
  
  export function GeneratePanel() {
    const navigate = useNavigate();
    const panel = usePanelStore((state) => state);
    const [caseSensitive, setCaseSensitive] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        navigate(`/generate`);
        panel.setPanel(Panel.GENERATE, false); 
      }
    };
  
    return (
      <CommandDialog
        open={panel.generate}
        onOpenChange={(open) => panel.setPanel(Panel.GENERATE, open)}
      >
        <CommandItem>
          <Input
            className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </CommandItem>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          <CommandGroup heading="Search Options">
            <CommandItem
              onSelect={() => setCaseSensitive(!caseSensitive)}
              className="flex justify-between items-center"
            >
              <div className="flex gap-2">
                <CaseSensitive />
                <span>Enable case sensitivity</span>
              </div>
              {caseSensitive && <CircleCheck />}
            </CommandItem>
            <CommandItem>
              <DatePickerWithRange />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );
  }
  