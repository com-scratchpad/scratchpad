import { storeCredentials as storeCredentials, initStore, clearCredentials } from '@/lib/stronghold';

export type LoginProps = {
    email: string;
    password: string;
}

/**
 * 
 * @param props - LoginProps which contains user's email and password
 * @throws Error - If the credentials are invalid
 */
export async function login(props: LoginProps) {
    await initStore();
    const response = await fetch("http://localhost:8000/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props),
    });

    if (!response.ok) {
        throw new Error("Invalid credentials");
    }

    const data = await response.json();
    const token = data.access_token; // Ensure API returns { token: "JWT_TOKEN" }

    if (!token) throw new Error("No token received");

    await storeCredentials(data); // Securely store token using Stronghold
}

export async function logout() {
    await initStore();
    await clearCredentials();
}

export async function register(props: LoginProps) {
    await initStore();
    const response = await fetch("http://localhost:8000/public/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    const data = await response.json();
    if (data.message && data.message.includes("verify your email")) {
        throw new VerifyEmailError("Please check your email to verify your account");
    }

    await storeCredentials(data);
}

export class VerifyEmailError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "VerifyEmailError";
    }
}
