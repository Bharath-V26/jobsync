"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeedPost } from "@/components/social/FeedPost";
import { Send } from "lucide-react";
import { useFeed } from "@/components/feed-provider";

export default function FeedPage() {
    const { posts, addPost } = useFeed();
    const [newPostContent, setNewPostContent] = useState("");

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        addPost(newPostContent);
        setNewPostContent("");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight metallic-text">Social Feed</h1>
                <p className="text-muted-foreground mt-2">
                    Connect with other job seekers and find hidden opportunities.
                </p>
            </div>

            {/* Create Post */}
            <div className="glass-card p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-lg">
                <form onSubmit={handlePost} className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                        Y
                    </div>
                    <div className="flex-1 flex gap-2">
                        <Input
                            placeholder="Share a job opportunity or ask for advice..."
                            className="bg-white/10 border-white/20 focus-visible:ring-primary/50 text-foreground placeholder:text-muted-foreground/70"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                        />
                        <Button type="submit" size="icon" disabled={!newPostContent.trim()} className="bg-primary hover:bg-primary/90 text-white shadow-md">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>

            {/* Feed */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <FeedPost key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
