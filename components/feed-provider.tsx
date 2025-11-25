"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Post {
    id: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    tags: string[];
    isLiked?: boolean;
}

const initialPosts: Post[] = [
    {
        id: "1",
        author: {
            name: "Sarah Chen",
            avatar: "bg-blue-500",
            role: "Senior Frontend Engineer",
        },
        content: "Just found an amazing opportunity at TechCorp! They are looking for React developers. DM me for a referral! 🚀 #hiring #reactjs",
        timestamp: "2h ago",
        likes: 24,
        comments: 5,
        tags: ["hiring", "reactjs"],
    },
    {
        id: "2",
        author: {
            name: "Alex Rivera",
            avatar: "bg-green-500",
            role: "Product Designer",
        },
        content: "Anyone have experience with the new Figma variables? Looking for some tips on structuring a design system. 🎨",
        timestamp: "4h ago",
        likes: 12,
        comments: 8,
        tags: ["design", "figma"],
    },
];

interface FeedContextType {
    posts: Post[];
    addPost: (content: string) => void;
    toggleLike: (postId: string) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<Post[]>([]);

    // Load from API on mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/feed");
                if (res.ok) {
                    const data = await res.json();
                    // Transform API data to UI format if needed
                    const formattedPosts = data.map((post: any) => ({
                        id: post.id,
                        author: {
                            name: post.user.name || "Anonymous",
                            avatar: post.user.image || "bg-primary",
                            role: "Job Seeker", // Default role
                        },
                        content: post.content,
                        timestamp: new Date(post.createdAt).toLocaleDateString(),
                        likes: post.likes,
                        comments: 0, // Not implemented yet
                        tags: [], // Not implemented yet
                        isLiked: false, // Need to check if user liked
                    }));
                    setPosts(formattedPosts);
                }
            } catch (error) {
                console.error("Failed to fetch feed:", error);
            }
        };

        fetchPosts();
    }, []);

    const addPost = async (content: string) => {
        try {
            const res = await fetch("/api/feed", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (res.ok) {
                const newPostData = await res.json();
                const newPost: Post = {
                    id: newPostData.id,
                    author: {
                        name: newPostData.user.name || "You",
                        avatar: newPostData.user.image || "bg-primary",
                        role: "Job Seeker",
                    },
                    content: newPostData.content,
                    timestamp: "Just now",
                    likes: 0,
                    comments: 0,
                    tags: [],
                };
                setPosts((prev) => [newPost, ...prev]);
            }
        } catch (error) {
            console.error("Failed to add post:", error);
        }
    };

    const toggleLike = (postId: string) => {
        // Optimistic update
        setPosts((prev) =>
            prev.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                        isLiked: !post.isLiked,
                    };
                }
                return post;
            })
        );
        // TODO: Implement API call for likes
    };

    return (
        <FeedContext.Provider value={{ posts, addPost, toggleLike }}>
            {children}
        </FeedContext.Provider>
    );
}

export function useFeed() {
    const context = useContext(FeedContext);
    if (context === undefined) {
        throw new Error("useFeed must be used within a FeedProvider");
    }
    return context;
}
