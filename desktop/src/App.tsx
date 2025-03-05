import "@/App.css";
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
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { SaveButton } from "@/components/save/SaveButton";
import { ModeToggle } from "@/providers/theme/toggle";
import { SearchPanel } from "@/components/command/SearchPanel";
import useEditorStore from "@/stores/editorStore";
import { initStore } from "@/lib/stronghold";
import { Toaster } from "@/components/ui/sonner";

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const {
		documentTitle,
		documentPlainText,
	} = useEditorStore();

    useEffect(()=> {initStore()}, [])

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
            <Toaster />
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
					<SaveButton title={documentTitle} content={documentPlainText} />
					<Button size={"icon_sm"} variant={"ghost"}>
						<MoreHorizontal />
					</Button>
				</header>
				<Tiptap />
				<CommandDialogDemo />
				<SearchPanel />
			</SidebarInset>
		</SidebarProvider>
	);
}

export default App;
