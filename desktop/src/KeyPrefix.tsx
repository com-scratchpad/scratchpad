import { useEffect } from "react";
import { Panel, usePanelStore } from "@/stores/commandStore";

// Key prefix handler with tmux-like behavior
export function useKeyPrefix() {
  const panel = usePanelStore();
  
  useEffect(() => {
    let prefixActive = false;
    let prefixTimeout: NodeJS.Timeout | null = null;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Step 1: Check for the prefix key (Ctrl+Space)
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        
        // Activate prefix mode
        prefixActive = true;
        
        // Clear any existing timeout
        if (prefixTimeout) {
          clearTimeout(prefixTimeout);
        }
        
        // Set a timeout to clear prefix mode after 2 seconds
        prefixTimeout = setTimeout(() => {
          prefixActive = false;
        }, 2000);
        
        return;
      }
      
      // Step 2: If prefix is active, check for command keys
      if (prefixActive) {
        // Clear the prefix mode immediately when a key is pressed
        prefixActive = false;
        if (prefixTimeout) {
          clearTimeout(prefixTimeout);
          prefixTimeout = null;
        }
        
        // Handle different commands based on the key
        switch (e.key.toLowerCase()) {
          case "t": // t for Telescope
            e.preventDefault();
            // Close any other panels first
            Object.values(Panel).forEach((panelKey) => {
              if (panel[panelKey]) {
                panel.setPanel(panelKey, false);
              }
            });
            // Open the editor/telescope panel
            panel.setPanel(Panel.EDITOR, true);
            break;
            
          case "c": // Example: c for Command palette
            e.preventDefault();
            panel.setPanel(Panel.COMMAND, true);
            break;
            
          case "g": // Example: g for Generate
            e.preventDefault();
            panel.setPanel(Panel.GENERATE, true);
            break;
            
          case "s": // Example: s for Search
            e.preventDefault();
            panel.setPanel(Panel.SEARCH, true);
            break;

          // Add more commands as needed
        }
      }
    };
    
    // Add the event listener
    document.addEventListener("keydown", handleKeyDown);
    
    // Clean up
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (prefixTimeout) {
        clearTimeout(prefixTimeout);
      }
    };
  }, [panel]);
  
  return null;
}
