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
import { useState } from "react";
import clsx from "clsx";
import { SearchBar } from "@/components/search/SearchBar";

function App() {
	const [isOpen, setIsOpen] = useState(false);

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
					<SearchBar />
					<Button size={"icon_sm"} variant={"ghost"}>
						<MoreHorizontal />
					</Button>
				</header>
				<Tiptap />
				<CommandDialogDemo />
			</SidebarInset>
		</SidebarProvider>
	);
}

export default App;
