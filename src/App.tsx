import "./App.css";
import Tiptap from "@/components/tiptap/Tiptap";
import { CommandDialogDemo } from "./components/command/command";
import { AppSidebar } from "@/components/sidebar/sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

function App() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "19rem",
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-10 shrink-0 items-center gap-2 px-4">
					<SidebarTrigger className="ml-16" />
					<Separator orientation="vertical" className="mr-2 h-4" />
				</header>
				<Tiptap />
				<CommandDialogDemo />
			</SidebarInset>
		</SidebarProvider>
	);
}

export default App;
