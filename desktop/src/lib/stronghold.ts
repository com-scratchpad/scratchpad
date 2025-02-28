import { Store } from "@tauri-apps/plugin-store";
import { appDataDir } from "@tauri-apps/api/path";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const USER_ID_KEY = "user_id";
let store: Store;

export const initStore = async () => {
    const storePath = `${await appDataDir()}/auth-store.json`;
    store = await Store.load(storePath);
};

export const storeCredentials = async (data: any) => {
    console.log(data)
    if (data.token !== null) {
        await store.set(TOKEN_KEY, data.token);
    }
    if (data.user !== null) {
        await store.set(USER_KEY, data.user);
    }
    if (data.user !== null && data.user.id !== null) {
        await store.set(USER_ID_KEY, data.user.id);
    }
}

export const getToken = async (): Promise<string | null> => {
    try {
        const token = await store.get<string>(TOKEN_KEY);
        return token || null;
    } catch {
        return null;
    }
};

export const clearToken = async (): Promise<boolean> => {
    try {
        return await store.delete(TOKEN_KEY);
    } catch {
        return false
    }
};

export const getUserId = async(): Promise<string | null> => {
    try {
        const token = await store.get<string>(USER_ID_KEY);
        return token || null;
    } catch {
        return null;
    }
}
