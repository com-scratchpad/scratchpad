import "./App.css";
import Tiptap from "@/components/tiptap/Tiptap";
import { ThemeProvider } from "@/providers/theme/theme";
import { CommandDialogDemo } from "./components/command/command";
import { useEffect, useState } from "react";

function App() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<main>
				<Tiptap />
				<CommandDialogDemo />
			</main>
		</ThemeProvider>
	);
}

export default App;
