import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Type definition for keyboard shortcuts
type Hotkey = {
  id: string;
  action: string;
  category: string;
  keys: string[];
  description?: string;
};

export function HotkeysSettings() {
  // Sample hotkeys data
  const allHotkeys: Hotkey[] = [
    { id: "1", action: "Quick Search", category: "General", keys: ["⌘", "J"], description: "Open search dialog" },
    { id: "2", action: "New Document", category: "Document", keys: ["⌘", "N"] },
    { id: "3", action: "Save Document", category: "Document", keys: ["⌘", "S"] },
    { id: "4", action: "Full Screen", category: "View", keys: ["F11"] },
    { id: "5", action: "Settings", category: "General", keys: ["⌘", ","] },
    { id: "6", action: "Bold Text", category: "Formatting", keys: ["⌘", "B"] },
    { id: "7", action: "Italic Text", category: "Formatting", keys: ["⌘", "I"] },
    { id: "8", action: "Find in Document", category: "Document", keys: ["⌘", "F"] },
    { id: "9", action: "Replace in Document", category: "Document", keys: ["⌘", "H"] },
    { id: "10", action: "Toggle Sidebar", category: "View", keys: ["⌘", "\\"] },
    { id: "11", action: "Undo", category: "General", keys: ["⌘", "Z"] },
    { id: "12", action: "Redo", category: "General", keys: ["⌘", "Shift", "Z"] },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter hotkeys based on search query
  const filteredHotkeys = allHotkeys.filter(hotkey => 
    hotkey.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotkey.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group hotkeys by category
  const groupedHotkeys = filteredHotkeys.reduce((acc, hotkey) => {
    if (!acc[hotkey.category]) {
      acc[hotkey.category] = [];
    }
    acc[hotkey.category].push(hotkey);
    return acc;
  }, {} as Record<string, Hotkey[]>);

  // Keyboard shortcut component
  const KeyboardShortcut = ({ keys }: { keys: string[] }) => (
    <div className="flex items-center gap-0.5">
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">{key}</span>
          </kbd>
          {index < keys.length - 1 && <span className="text-xs text-muted-foreground">+</span>}
        </React.Fragment>
      ))}
    </div>
  );

  // Hotkey list item component
  const HotkeyItem = ({ hotkey }: { hotkey: Hotkey }) => (
    <div className="flex items-center justify-between py-0.5 hover:bg-muted/20 rounded h-7">
      <div className="flex items-center">
        <span className="text-xs">{hotkey.action}</span>
        {hotkey.description && (
          <span className="text-[10px] text-muted-foreground ml-1">
            — {hotkey.description}
          </span>
        )}
      </div>
      <KeyboardShortcut keys={hotkey.keys} />
    </div>
  );

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold">Keyboard Shortcuts</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
          <Input 
            className="w-36 h-6 pl-7 text-xs py-1 pr-2"
            placeholder="Search shortcuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-0.5 max-h-[400px] overflow-y-auto pr-1">
        {Object.keys(groupedHotkeys).length > 0 ? (
          Object.entries(groupedHotkeys).map(([category, hotkeys]) => (
            <div key={category}>
              <h3 className="text-xs font-medium pt-4 pb-1 mt-2 mb-1 first:pt-0 first:mt-0">
                {category}
              </h3>
              <div className="space-y-0.5">
                {hotkeys.map(hotkey => (
                  <HotkeyItem key={hotkey.id} hotkey={hotkey} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-xs text-muted-foreground">
            No shortcuts found matching "{searchQuery}"
          </div>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground pt-2 mt-2">
        <p>Customize shortcuts in Settings → Keyboard.</p>
      </div>
    </div>
  );
}
