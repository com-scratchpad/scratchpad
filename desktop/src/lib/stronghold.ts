import { Store } from "@tauri-apps/plugin-store";
import { appDataDir } from "@tauri-apps/api/path";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user";
const USER_ID_KEY = "user_id";
let store: Store;

export const initStore = async () => {
    const storePath = `${await appDataDir()}/auth-store.json`;
    store = await Store.load(storePath);
};

export const storeCredentials = async (data: any): Promise<void> => {
    if (data.access_token !== null) {
        await store.set(TOKEN_KEY, data.access_token);
    }
    if (data.user !== null) {
        await store.set(USER_KEY, data.user);
    }
    if (data.user.id !== null) {
        await store.set(USER_ID_KEY, data.user.id);
    }
    store.save();
};

export const getToken = async (): Promise<string | null> => {
    try {
        await initStore();
        const token = await store.get<string>(TOKEN_KEY);
        return token || null;
    } catch {
        return null;
    }
};

export const getUserId = async(): Promise<string | null> => {
    try {
        const id = await store.get<string>(USER_ID_KEY);
        return id || null;
    } catch {
        return null;
    }
}

export const clearCredentials = async (): Promise<boolean> => {
    try {
        await store.delete(TOKEN_KEY);
        await store.delete(USER_KEY);
        await store.delete(USER_ID_KEY);
    } catch {
        return false
    }
    return true
};
