import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register, VerifyEmailError } from "@/api/auth";


export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await register({ email, password });
            navigate("/");
        } catch (error) {
            if (error instanceof VerifyEmailError) {
                // Show verification message to user
                setError("Please check your email to verify your account");
                setTimeout(() => {
                    navigate("/login");
                }, 3000); // Redirect to login after 3 seconds
            } else {
                console.log(error);
                setError(error instanceof Error ? error.message : "Registration failed");
            }
        }
    };

    //Function to check passwords
    const passwordsMatch = () => {
        return password === confirmPassword || confirmPassword === '';
    };

    return(
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </a>
                        <h1 className="text-xl font-bold">scratchpad.</h1>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-xs">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="xyz@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-xs">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword" className="text-xs">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {!passwordsMatch() && (
                                <p className="text-red-500 text-xs">Passwords do not match</p>
                            )}
                        </div>
                        {error && <p className="text-red-500 text-xs">{error}</p>}
                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={!passwordsMatch() || !password || !confirmPassword}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        
                        <Button
                            onClick={() => navigate("/login")}
                            type="submit"
                            className="w-full"
                        >
                            Login
                        </Button>
                            
                    </div>
                </div>
            </form>
            <div className="text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}