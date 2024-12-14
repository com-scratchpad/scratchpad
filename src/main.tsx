import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@/providers/theme/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
