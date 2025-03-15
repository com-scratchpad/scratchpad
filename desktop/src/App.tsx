import "./App.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { initStore } from "@/lib/stronghold";
import { Toaster } from "@/components/ui/sonner";
import { ThemePanel } from "./components/command/ThemePanel";
import MinimalSidebar from "./AppSidebar";
import { GeneratePanel } from "./components/command/GeneratePanel";
import { SearchPanel } from "./components/command/SearchPanel";
import { CommandDialogDemo } from "@/components/command/command";
import { useNavigate } from "react-router-dom";
import { isTauri } from "./platform";
import TabsHeader from "@/components/home/tabs/tabs_header";
import TabContent from "@/components/home/tabs/tab_content";
import { useTabStore } from "@/stores/tabStore";
import { TelescopePanel } from "./components/command/TelescopePanel";
import { useKeyHandler } from "@/KeyPrefix";


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { tabs, activeTabId, createTab } = useTabStore();
  useKeyHandler();
  
  useEffect(() => {
    // Init stores
    initStore();
    
    // Create a default tab if none exists
    if (tabs.length === 0) {
      createTab("Untitled", "<p>Welcome to your editor!</p>");
    }
  }, []);

  return (
    <div
      className={clsx("h-screen w-screen flex flex-col", {
        "pt-2": !isTauri(),
      })}
    >
      <Toaster />
      <TabsHeader />
      <div className="flex-1 mx-6 overflow-hidden flex mt-4">
        <div className="flex-1 mr-6 overflow-auto">
          {/* Tab Content (which includes Tiptap) */}
          <TabContent />
        </div>
        <div className="pt-2">
          <MinimalSidebar />
        </div>
      </div>

      <CommandDialogDemo />
      <GeneratePanel />
      <SearchPanel />
      <ThemePanel />
      <TelescopePanel />
    </div>
  );
}

export default App;
