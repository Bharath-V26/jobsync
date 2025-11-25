"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema, type SignupInput } from "@/lib/validations";

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: SignupInput) => {
        setIsLoading(true);
        setError("");

        try {
            // Create user account
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                setError(responseData.error || "Failed to create account");
                setIsLoading(false);
                return;
            }

            // Sign in the user
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError("Account created but failed to sign in");
                setIsLoading(false);
                return;
            }

            // Redirect to onboarding
            router.push("/onboarding");
        } catch (error) {
            setError("Something went wrong");
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        await signIn("google", { callbackUrl: "/onboarding" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10 p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

            <Card className="w-full max-w-md glass-card border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl relative z-10">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
                            JS
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Create an account</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                        Enter your details to create your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                {...register("name")}
                                className="bg-white/5 border-white/10 focus-visible:ring-primary/50"
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                                className="bg-white/5 border-white/10 focus-visible:ring-primary/50"
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className="bg-white/5 border-white/10 focus-visible:ring-primary/50"
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Must be 8+ characters with uppercase, lowercase, and number
                            </p>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all"
                            disabled={isLoading || !isValid}
                        >
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white/5 border-white/10 hover:bg-white/10 hover:text-primary transition-colors"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            Google
                        </Button>
                    </CardContent>
                </form>
                <CardFooter>
                    <p className="text-sm text-center w-full text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
