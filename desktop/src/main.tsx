import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/providers/theme/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { core } from "@tauri-apps/api";

core.invoke("checkhealth").then(console.log);
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
	  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
	  	<RouterProvider router={router} />
	  </ThemeProvider>
	</React.StrictMode>
  );
