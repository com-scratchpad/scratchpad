import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import SearchLayout from "@/components/search/layout";
import AuthGuard from "./auth_guard";
import LoginPage from "./login";
import RegisterPage from "./register";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage/>,
	},
	{
		path: "/",
		element: (
			<AuthGuard>
				<App />
			</AuthGuard>
		),
	},
	{
		path: "/search",
		element: (
			<AuthGuard>
				<SearchLayout children/>
			</AuthGuard>
		),
	},
]);

