import "./App.css";
import Tiptap from "./Tiptap";
import { ThemeProvider } from "@/theme";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<main>
				<Tiptap />
			</main>
		</ThemeProvider>
	);
}

export default App;
