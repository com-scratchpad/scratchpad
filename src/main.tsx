import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<div className="mt-8 mx-2">
			<App />
		</div>
	</React.StrictMode>,
);
