"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/components/profile-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export function UnifiedProfileForm() {
    const { profile, updateProfile, isLoading: isProfileLoading } = useProfile();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState(profile);
    const router = useRouter();

    // Sync form data with profile when loaded
    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        updateProfile(formData);
        setIsSaving(false);
        // Redirect to dashboard after successful save
        router.push("/dashboard");
    };

    if (isProfileLoading) {
        return <div>Loading profile...</div>;
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Personal Information</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        This information will be used to auto-fill job applications.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} className="bg-white/80 dark:bg-black/30 border-gray-300 dark:border-white/20 focus-visible:ring-primary/50 placeholder:text-muted-foreground/70" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="bg-white/80 dark:bg-black/30 border-gray-300 dark:border-white/20 focus-visible:ring-primary/50 placeholder:text-muted-foreground/70" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} className="bg-white/80 dark:bg-black/30 border-gray-300 dark:border-white/20 focus-visible:ring-primary/50 placeholder:text-muted-foreground/70" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="San Francisco, CA" value={formData.location} onChange={handleChange} className="bg-white/80 dark:bg-black/30 border-gray-300 dark:border-white/20 focus-visible:ring-primary/50 placeholder:text-muted-foreground/70" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="portfolio">Portfolio / LinkedIn URL</Label>
                            <Input id="portfolio" type="url" placeholder="https://linkedin.com/in/johndoe" value={formData.portfolio} onChange={handleChange} className="bg-white/80 dark:bg-black/30 border-gray-300 dark:border-white/20 focus-visible:ring-primary/50 placeholder:text-muted-foreground/70" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Professional Summary</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            A brief overview of your skills and experience.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            id="summary"
                            placeholder="Experienced software engineer with a passion for..."
                            className="min-h-[150px] bg-white/80 dark:bg-black/30 border-gray-300 dark:border-white/20 focus-visible:ring-primary/50 placeholder:text-muted-foreground/70"
                            value={formData.summary}
                            onChange={handleChange}
                        />
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Resume</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Upload your resume to parse details automatically.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl p-8 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Upload className="h-6 w-6 text-primary" />
                                </div>
                                <p className="text-sm font-medium">
                                    Drag & drop or click to upload
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PDF, DOCX up to 5MB
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()} className="bg-white/5 border-white/10 hover:bg-white/10">
                    Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all">
                    {isSaving ? "Saving..." : "Save Profile"}
                </Button>
            </div>
        </motion.form>
    );
}
