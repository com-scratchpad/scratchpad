import { clearToken } from "@/lib/stronghold";
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom";

export default function SignOutButton() {
    const navigate = useNavigate();

    const signOut = async () => {
        try {
            await clearToken();
        } catch (error) {
            console.error("Error clearing token from Stronghold:", error);
        }
        navigate("/login");
    }

    return (
        <Button onClick={signOut}>
            <span>Sign Out</span>
        </Button>
    )
}
