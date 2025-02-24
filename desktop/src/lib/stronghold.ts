import { Store } from "@tauri-apps/plugin-store";
import { appDataDir } from "@tauri-apps/api/path";

const TOKEN_KEY = "auth_token";
let store: Store;

export const initStore = async () => {
	const storePath = `${await appDataDir()}/auth-store.json`;
	store = await Store.load(storePath);
};

export const storeToken = async (token: string) => {
	await store.set(TOKEN_KEY, token);
	await store.save();
};

export const getToken = async (): Promise<string | null> => {
	try {
		const token = await store.get<string>(TOKEN_KEY);
		return token || null;
	} catch {
		return null;
	}
};

export const removeToken = async () => {
	await store.delete(TOKEN_KEY);
	await store.save();
	console.log("Token removed successfully");
};
