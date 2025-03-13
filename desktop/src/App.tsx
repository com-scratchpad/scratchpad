import "@/App.css";
import Tiptap from "@/components/tiptap/Tiptap";
import { CommandDialogDemo } from "@/components/command/command";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { initStore } from "@/lib/stronghold";
import { Toaster } from "@/components/ui/sonner";
import { ThemePanel } from "./components/command/ThemePanel";
import MinimalSidebar from "./AppSidebar";
import { GeneratePanel } from "./components/command/GeneratePanel";
import { SearchPanel } from "./components/command/SearchPanel";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=> {initStore()}, [])

  return (
    <div className="h-screen w-screen flex flex-col">
      <Toaster />
      <header
        className={clsx("flex h-10 shrink-0 ml-16 items-center gap-2 px-3", {
          "-ml-1": isOpen,
        })}
        data-tauri-drag-region
      >
        {/* Header content */}
      </header>
      <div className="flex-1 mx-6 overflow-hidden flex">
        <div className="flex-1 mr-6 overflow-auto">
          <Tiptap />
        </div>
        <MinimalSidebar />
      </div>
      <CommandDialogDemo />
      <GeneratePanel />
      <SearchPanel />
      <ThemePanel />
    </div>
  );
}

export default App;
