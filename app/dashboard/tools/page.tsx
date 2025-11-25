"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/components/profile-provider";
import { MousePointerClick, Bookmark } from "lucide-react";

export default function ToolsPage() {
    const { profile } = useProfile();

    // This script will be embedded in the bookmarklet
    // It needs to be a single line string, URI encoded
    const generateBookmarklet = () => {
        const userData = {
            name: profile.fullName || "",
            email: profile.email || "",
            phone: profile.phone || "",
            linkedin: profile.portfolio || "",
            portfolio: profile.portfolio || "",
        };

        const code = `
      (function(){
        const data = ${JSON.stringify(userData)};
        const mappings = {
          'name': data.name,
          'first_name': data.name.split(' ')[0],
          'last_name': data.name.split(' ')[1] || '',
          'email': data.email,
          'phone': data.phone,
          'linkedin': data.linkedin,
          'website': data.portfolio,
          'portfolio': data.portfolio
        };

        let filled = 0;
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
          const name = input.name.toLowerCase();
          const id = input.id.toLowerCase();
          const type = input.type;
          
          for (const [key, value] of Object.entries(mappings)) {
            if ((name.includes(key) || id.includes(key)) && type !== 'hidden' && type !== 'submit') {
              input.value = value;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
              input.style.backgroundColor = '#e6fffa'; // Light green highlight
              input.style.border = '2px solid #38b2ac';
              filled++;
              break;
            }
          }
        });
        
        alert('JobSync Auto-fill: ' + filled + ' fields filled!');
      })();
    `;

        return `javascript:${encodeURIComponent(code.replace(/\s+/g, ' ').trim())}`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight metallic-text">Tools & Extensions</h1>
                <p className="text-muted-foreground mt-2">
                    Supercharge your job search with our browser tools.
                </p>
            </div>

            <Card className="glass-card border-l-4 border-l-primary">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <MousePointerClick className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle>JobSync Auto-fill Bookmarklet</CardTitle>
                            <CardDescription>
                                Drag this button to your bookmarks bar to auto-fill job applications on any site.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl bg-secondary/20">
                        <p className="mb-4 text-sm font-medium text-muted-foreground">
                            👇 Drag this button to your Bookmarks Bar
                        </p>
                        <a
                            href={generateBookmarklet()}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 shadow-lg cursor-grab active:cursor-grabbing"
                            onClick={(e) => e.preventDefault()} // Prevent clicking, meant for dragging
                            title="Drag me to your bookmarks bar!"
                        >
                            <Bookmark className="mr-2 h-4 w-4" />
                            JobSync Auto-fill
                        </a>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">How to use:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                            <li>Drag the button above to your browser's bookmarks bar.</li>
                            <li>Navigate to any job application page (e.g., on Greenhouse, Lever, or company sites).</li>
                            <li>Click the <strong>JobSync Auto-fill</strong> bookmark.</li>
                            <li>Watch as your details are magically filled in! ✨</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
