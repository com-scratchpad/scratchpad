import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, initStore } from "@/lib/stronghold";

const isAuthenticated = async () => {
	try {
		await initStore();
    console.log("INITIALIZED STORE");
		const token = await getToken();
		console.log("FOUND TOKEN: ", token);
		return token !== null && token !== "";
	} catch (error) {
		console.error("Error reading token from Stronghold:", error);
		return false;
	}
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			const authStatus = await isAuthenticated();
			setAuth(authStatus);
		};
		checkAuth();
	}, []);

	if (auth === null) return null;

	return auth ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;
