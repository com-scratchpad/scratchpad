import { isTauri } from '@/platform';

const TOKEN_KEY = "auth_token";
const USER_KEY = "user";
const USER_ID_KEY = "user_id";

interface IAuthStore {
  init(): Promise<void>;
  set(key: string, value: any): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
  save(): Promise<void>;
}

// Tauri-specific implementation
class TauriStore implements IAuthStore {
  private store: any;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    
    try {
      const { Store } = await import('@tauri-apps/plugin-store');
      const { appDataDir } = await import('@tauri-apps/api/path');
      
      const storePath = `${await appDataDir()}/auth-store.json`;
      this.store = await Store.load(storePath);
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize Tauri store:", error);
      throw error;
    }
  }

  async set(key: string, value: any): Promise<void> {
    await this.init();
    await this.store.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    await this.init();
    try {
      const value = await this.store.get<T>(key);
      return value || null;
    } catch {
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    await this.init();
    await this.store.delete(key);
  }

  async save(): Promise<void> {
    await this.init();
    await this.store.save();
  }
}

// Browser implementation using localStorage
class BrowserStore implements IAuthStore {
  // No need for actual initialization in browser
  async init(): Promise<void> {
    // Nothing to initialize for localStorage
  }

  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch {
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async save(): Promise<void> {
    // localStorage saves immediately, so this is a no-op
  }
}

// Factory to create the appropriate store
const createStore = (): IAuthStore => {
  if (isTauri()) {
    return new TauriStore();
  } else {
    return new BrowserStore();
  }
};

// Create the appropriate store singleton
const store = createStore();

// Initialize store only once
let initPromise: Promise<void> | null = null;
export const initStore = async (): Promise<void> => {
  if (!initPromise) {
    initPromise = store.init();
  }
  return initPromise;
};

export const storeCredentials = async (data: any): Promise<void> => {
  await initStore();
  
  if (data.access_token !== null) {
    await store.set(TOKEN_KEY, data.access_token);
  }
  
  if (data.user !== null) {
    await store.set(USER_KEY, data.user);
  }
  
  if (data.user && data.user.id !== null) {
    await store.set(USER_ID_KEY, data.user.id);
  }
  
  await store.save();
};

export const getToken = async (): Promise<string | null> => {
  try {
    await initStore();
    return await store.get<string>(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const getUserId = async(): Promise<string | null> => {
  try {
    await initStore();
    return await store.get<string>(USER_ID_KEY);
  } catch {
    return null;
  }
};

export const clearCredentials = async (): Promise<boolean> => {
  try {
    await initStore();
    await store.delete(TOKEN_KEY);
    await store.delete(USER_KEY);
    await store.delete(USER_ID_KEY);
    await store.save();
    return true;
  } catch {
    return false;
  }
};
