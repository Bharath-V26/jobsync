import { NextResponse } from "next/server";
import { mockJobs } from "@/lib/mock-data";
import { searchJobs } from "@/lib/adzuna";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "developer";
    const location = searchParams.get("location") || "san francisco";
    const country = searchParams.get("country") || "us";
    const page = parseInt(searchParams.get("page") || "1");

    // Simulate network delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const realJobs = await searchJobs(country, page, q, location);

    // Only mix in mock jobs if we're on the default search to avoid confusion
    const showMock = q === "developer" && location === "san francisco" && page === 1;
    const allJobs = showMock ? [...realJobs, ...mockJobs] : realJobs;

    return NextResponse.json(allJobs);
}

