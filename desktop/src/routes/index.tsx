import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { SearchPage } from "@/pages/SearchPage";
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
				<SearchPage />
			</AuthGuard>
		),
	},
]);

