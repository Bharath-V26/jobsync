"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, Heart, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Post, useFeed } from "@/components/feed-provider";

interface FeedPostProps {
    post: Post;
}

export function FeedPost({ post }: FeedPostProps) {
    const { toggleLike } = useFeed();

    return (
        <Card className="glass-card hover:border-primary/30 transition-colors">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarFallback className={post.author.avatar}>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">{post.author.name}</h3>
                            <p className="text-xs text-muted-foreground">{post.author.role}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <p className="text-sm leading-relaxed mb-3">
                    {post.content}
                </p>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs font-normal bg-secondary/50 text-muted-foreground hover:bg-secondary">
                            #{tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="pt-2 pb-2">
                <div className="flex items-center gap-4 w-full">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`text-muted-foreground hover:text-red-500 gap-2 ${post.isLiked ? "text-red-500" : ""}`}
                        onClick={() => toggleLike(post.id)}
                    >
                        <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                        <span className="text-xs">{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs">{post.comments}</span>
                    </Button>
                    <div className="flex-1" />
                    <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                </div>
            </CardFooter>
        </Card>
    );
}
