import { Job } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Building2, Bookmark, BookmarkCheck } from "lucide-react";
import Link from "next/link";
import { useSavedJobs } from "@/components/saved-jobs-provider";

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    const { isJobSaved, toggleSaveJob } = useSavedJobs();
    const saved = isJobSaved(job.id);

    return (
        <Card className="glass-card hover:border-primary/50 transition-colors group relative">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className={`h-12 w-12 rounded-lg ${job.logo} flex items-center justify-center text-white font-bold shadow-md`}>
                            {job.company.charAt(0)}
                        </div>
                        <div>
                            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                                {job.title}
                            </CardTitle>
                            <CardDescription className="flex items-center mt-1">
                                <Building2 className="h-3 w-3 mr-1" />
                                {job.company}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Badge variant={job.matchScore > 85 ? "default" : "secondary"} className={job.matchScore > 85 ? "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20" : ""}>
                            {job.matchScore}% Match
                        </Badge>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                            onClick={() => toggleSaveJob(job.id, job)}
                        >
                            {saved ? <BookmarkCheck className="h-5 w-5 text-primary fill-primary/20" /> : <Bookmark className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location}
                    </div>
                    <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                        <Clock className="h-3 w-3 mr-1" />
                        {job.type}
                    </div>
                    <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {job.salary}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                </p>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{job.postedAt}</span>
                <div className="flex gap-2">
                    <Link href={`/dashboard/jobs/${job.id}`}>
                        <Button size="sm" className="w-full md:w-auto">Apply Now</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
