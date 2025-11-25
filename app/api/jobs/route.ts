import { NextResponse } from "next/server";
import { mockJobs } from "@/lib/mock-data";
import { searchJobs } from "@/lib/adzuna";

export async function GET() {
    // Simulate network delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const realJobs = await searchJobs();
    const allJobs = [...realJobs, ...mockJobs];

    return NextResponse.json(allJobs);
}

