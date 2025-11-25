import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl shadow-sm">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                        Search jobs...
                    </label>
                    <div className="relative w-full max-w-md">
                        <Search
                            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground ml-3"
                            aria-hidden="true"
                        />
                        <input
                            id="search-field"
                            className="block h-full w-full border-0 bg-transparent py-0 pl-10 pr-0 text-foreground placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
                            placeholder="Search for jobs, companies, or skills..."
                            type="search"
                            name="search"
                        />
                    </div>
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">View notifications</span>
                    </Button>
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />
                    <div className="flex items-center gap-x-4">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                            JD
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
