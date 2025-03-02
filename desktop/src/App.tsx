import "./App.css";
import Tiptap from "@/components/tiptap/Tiptap";
import { CommandDialogDemo } from "@/components/command/command";
import { AppSidebar } from "@/components/sidebar/sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { SaveButton } from "./components/save/SaveButton";
import { ModeToggle } from "./providers/theme/toggle";
import { SearchPanel } from "./components/command/SearchPanel";

function App() {
	const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");

    // Update dependent component when content is changed
    useEffect(() => {}, [content]);

	return (
		<SidebarProvider
			open={isOpen}
			onOpenChange={setIsOpen}
			style={
				{
					"--sidebar-width": "19rem",
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			<SidebarInset>
				<header
					className={clsx("flex h-10 shrink-0 ml-16 items-center gap-2 px-3", {
						"-ml-1": isOpen,
					})}
				>
					<SidebarTrigger size={"icon_sm"} className="-ml-1 transition-all" />
					<div className="flex-1"></div>
          <ModeToggle />
					<SaveButton title="Document 1" content={content}/>
					<Button size={"icon_sm"} variant={"ghost"}>
						<MoreHorizontal />
					</Button>
				</header>
				<Tiptap updateContent={(content: string) => {setContent(content)}}/>
				<CommandDialogDemo />
				<SearchPanel />
			</SidebarInset>
		</SidebarProvider>
	);
}

export default App;
