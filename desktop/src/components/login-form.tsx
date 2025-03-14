import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/api/auth";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			await login({ email, password });

			navigate("/");
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Login failed");
		}
	};

	return (
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
						<h1 className="text-xl font-bold">mosiac.</h1>
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
						{error && <p className="text-red-500 text-xs">{error}</p>}
						<Button type="submit" className="w-full">
							Login
						</Button>
						<Button onClick={() => navigate('/register')} type="submit" className="w-full">
							Register
						</Button>
					</div>
				</div>
			</form>
			<div className="text-center text-xs text-muted-foreground">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
