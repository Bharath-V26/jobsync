import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ProfileProvider } from "@/components/profile-provider";
import { SavedJobsProvider } from "@/components/saved-jobs-provider";
import { FeedProvider } from "@/components/feed-provider";
import { cn } from "@/lib/utils";
import { MouseFollower } from "@/components/ui/mouse-follower";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobSync - Your AI Job Assistant",
  description: "All your job applications in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <SessionProvider>
          <ProfileProvider>
            <SavedJobsProvider>
              <FeedProvider>
                <MouseFollower />
                <div className="flex min-h-screen flex-col">
                  {children}
                </div>
              </FeedProvider>
            </SavedJobsProvider>
          </ProfileProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
