import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobFeed } from "@/components/job-feed/JobFeed";
import { JobFilters } from "@/components/job-feed/JobFilters";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here are the latest jobs matching your profile.
          </p>
        </div>
        <Link href="/profile">
          <Button variant="premium">
            Update Profile
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applications
            </CardTitle>
            <div className="text-2xl font-bold">12</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Interviews Scheduled
            </CardTitle>
            <div className="text-2xl font-bold">3</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profile Views
            </CardTitle>
            <div className="text-2xl font-bold">45</div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-1">
          <JobFilters />
        </div>
        <div className="lg:col-span-3">
          <JobFeed />
        </div>
      </div>
    </div>
  );
}
