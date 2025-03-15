import { useEffect } from "react";
import { Panel, usePanelStore } from "@/stores/commandStore";
import { useTabStore } from "@/stores/tabStore"; // Importing the tab store

// Enhanced key handler with both prefix and direct shortcuts (using Ctrl/Alt instead of Cmd)
export function useKeyHandler() {
  const panel = usePanelStore();
  const tabStore = useTabStore(); // Using the tab store
  
  useEffect(() => {
    // Prefix key handling
    let prefixActive = false;
    let prefixTimeout: NodeJS.Timeout | null = null;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Ctrl-based shortcuts for tab operations
      if (e.ctrlKey && !e.altKey && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case "t": // Ctrl+T: Create new tab
            e.preventDefault();
            tabStore.createTab("Untitled", "");
            return;
            
          case "w": // Ctrl+W: Close current tab
            e.preventDefault();
            if (tabStore.activeTabId !== null) {
              tabStore.deleteTab(tabStore.activeTabId);
            }
            return;
            
          case "s": // Ctrl+S: Save current tab
            e.preventDefault();
            // Implement save functionality or call your save method
            console.log("Saving tab:", tabStore.getActiveTab()?.title);
            if (tabStore.activeTabId) {
              // Update the tab to mark it as "saved"
              tabStore.updateTab(tabStore.activeTabId, { 
                // You might add a "saved" property to your Tab interface
                // saved: true
              });
            }
            return;
        }
      }
      
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "1": case "2": case "3": case "4": case "5": 
          case "6": case "7": case "8": case "9": // Alt+Number: Switch to tab
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1; // Convert to 0-based index
            const targetTab = tabStore.tabs[tabIndex];
            if (targetTab) {
              tabStore.setActiveTab(targetTab.id);
            }
            return;
            
          case "arrowright": // Alt+Right: Next tab
            e.preventDefault();
            const currentIndex = tabStore.tabs.findIndex(tab => tab.id === tabStore.activeTabId);
            if (currentIndex !== -1 && currentIndex < tabStore.tabs.length - 1) {
              tabStore.setActiveTab(tabStore.tabs[currentIndex + 1].id);
            }
            return;
            
          case "arrowleft": // Alt+Left: Previous tab
            e.preventDefault();
            const currIndex = tabStore.tabs.findIndex(tab => tab.id === tabStore.activeTabId);
            if (currIndex > 0) {
              tabStore.setActiveTab(tabStore.tabs[currIndex - 1].id);
            }
            return;
        }
      }
      
      // Prefix key handling (Ctrl+Space)
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
      
      // Handle prefix-activated commands
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
            
          case "n": // New tab
            e.preventDefault();
            tabStore.createTab();
            break;
            
          case "w": // Close tab
            e.preventDefault();
            if (tabStore.activeTabId) {
              tabStore.deleteTab(tabStore.activeTabId);
            }
            break;
            
          case "arrowright": case "l": // Next tab
            e.preventDefault();
            const currentIndex = tabStore.tabs.findIndex(tab => tab.id === tabStore.activeTabId);
            if (currentIndex !== -1 && currentIndex < tabStore.tabs.length - 1) {
              tabStore.setActiveTab(tabStore.tabs[currentIndex + 1].id);
            }
            break;
            
          case "arrowleft": case "h": // Previous tab
            e.preventDefault();
            const currIndex = tabStore.tabs.findIndex(tab => tab.id === tabStore.activeTabId);
            if (currIndex > 0) {
              tabStore.setActiveTab(tabStore.tabs[currIndex - 1].id);
            }
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
  }, [panel, tabStore]); // Include tabStore in the dependencies
  
  return null;
}
