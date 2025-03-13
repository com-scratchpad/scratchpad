import "./App.css";
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
import { Button } from "./components/ui/button";
import { ArrowLeft, ArrowRight} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "./lib/utils";
import { isTauri } from "./platform";
import MoreHorizontal from "./components/home/more_horizontal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(()=> {initStore()}, [])

  return (
    <div className={clsx(
        "h-screen w-screen flex flex-col", {
        "pt-2": !isTauri(),
      })}
    >
      <Toaster />
        {isTauri() && <header
        className={clsx("flex h-10 shrink-0 items-center gap-2 px-3", {
          "ml-16": isTauri(),
          "-ml-1": isOpen,
        })}
        data-tauri-drag-region
      >
          <div 
          className={cn(
            "absolute top-2 z-50 flex items-center gap-.5",
            "transition-all duration-250 ease-in-out",
          )}
        >
            <Button
            data-sidebar="navigator-left"
            variant="ghost"
            size="icon_sm"
            className="h-7 w-7 min-w-7"
            onClick={() => {
              navigate(-1);
            }}
          >
              <ArrowLeft className="stroke-zinc-800" />
              <span className="sr-only">Navigate Left</span>
            </Button>
            <Button
            data-sidebar="navigator-right"
            variant="ghost"
            size="icon_sm"
            className="h-7 w-7 min-w-7"
            onClick={(event) => {
            }}
          >
              <ArrowRight className="stroke-zinc-800" />
              <span className="sr-only">Navigate Right</span>
            </Button>
          </div>
        </header>}
        <div className="flex-1 mx-6 overflow-hidden flex">
          <div className="flex-1 mr-6 overflow-auto">
            <Tiptap />
          </div>
          <div className="pt-2">
          <MinimalSidebar />
          </div>
        </div>
        <CommandDialogDemo />
        <GeneratePanel />
        <SearchPanel />
        <ThemePanel />
      </div>
  );
}

export default App;
