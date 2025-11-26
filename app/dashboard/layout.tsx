import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ApplicationsProvider } from "@/components/applications-provider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ApplicationsProvider>
            <div className="min-h-full">
                <Sidebar />
                <div className="lg:pl-72 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 py-8 px-6">
                        {children}
                    </main>
                </div>
            </div>
        </ApplicationsProvider>
    );
}
