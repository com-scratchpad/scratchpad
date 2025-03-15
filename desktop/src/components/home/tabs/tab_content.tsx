import { useEffect, useState } from 'react';
import Tiptap from "@/components/tiptap/Tiptap";
import { useTabStore } from "@/stores/tabStore";
import { Button } from "@/components/ui/button";
import { FileEditIcon, Plus } from "lucide-react";

export function TabContent() {
  const { tabs, activeTabId, createTab, getActiveTab, updateTab } = useTabStore();
  const activeTab = getActiveTab();
  
  // Content synchronization
  const handleContentChange = (content: string) => {
    if (activeTabId) {
      updateTab(activeTabId, { content });
    }
  };

  // If there are no tabs or no active tab selected
  if (!activeTab) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="p-8 rounded-lg bg-muted/50 flex flex-col items-center gap-4">
          <FileEditIcon size={48} className="text-muted-foreground" />
          <h3 className="text-xl font-medium">No document open</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Create a new document or select an existing one from the tabs above.
          </p>
          <Button onClick={() => createTab()} className="mt-2">
            <Plus className="mr-2 h-4 w-4" /> New Document
          </Button>
        </div>
      </div>
    );
  }

  // When we have an active tab
  return (
    <div className="flex-1 h-full overflow-auto">
      <Tiptap 
        initialContent={activeTab.content}
        onUpdate={handleContentChange}
      />
    </div>
  );
}

export default TabContent;
