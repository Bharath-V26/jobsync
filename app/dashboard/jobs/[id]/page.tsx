import { mockJobs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, DollarSign, Building2, Globe, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyHelper } from "@/components/job-feed/ApplyHelper";

interface JobPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function JobPage({ params }: JobPageProps) {
    const { id } = await params;
    const job = mockJobs.find((j) => j.id === id);

    if (!job) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>

            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                <div className="flex gap-4">
                    <div className={`h-16 w-16 rounded-xl ${job.logo} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                        {job.company.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight metallic-text">{job.title}</h1>
                        <div className="flex items-center text-muted-foreground mt-1">
                            <Building2 className="h-4 w-4 mr-1" />
                            <span className="font-medium">{job.company}</span>
                            <span className="mx-2">•</span>
                            <span className="text-sm">{job.location}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="icon" className="metallic-border">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <ApplyHelper>
                        <Button size="lg" className="bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white text-white dark:text-black shadow-lg hover:shadow-xl transition-all">
                            Apply Now
                        </Button>
                    </ApplyHelper>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card className="glass-card">
                        <CardContent className="pt-6">
                            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                                <p>{job.description}</p>
                                <p className="mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Requirements</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>3+ years of experience with React and Next.js</li>
                                    <li>Strong understanding of TypeScript</li>
                                    <li>Experience with Tailwind CSS</li>
                                    <li>Knowledge of backend technologies is a plus</li>
                                </ul>
                                <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Benefits</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Competitive salary and equity</li>
                                    <li>Remote-first culture</li>
                                    <li>Health, dental, and vision insurance</li>
                                    <li>Unlimited PTO</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="glass-card">
                        <CardContent className="pt-6 space-y-4">
                            <h3 className="font-semibold">Job Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center">
                                        <Clock className="h-4 w-4 mr-2" /> Posted
                                    </span>
                                    <span>{job.postedAt}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center">
                                        <Briefcase className="h-4 w-4 mr-2" /> Type
                                    </span>
                                    <span>{job.type}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center">
                                        <DollarSign className="h-4 w-4 mr-2" /> Salary
                                    </span>
                                    <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center">
                                        <Globe className="h-4 w-4 mr-2" /> Source
                                    </span>
                                    <Badge variant="secondary">{job.source}</Badge>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Match Score</span>
                                    <span className="text-sm font-bold text-primary">{job.matchScore}%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${job.matchScore}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Helper icon
function Briefcase(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}
