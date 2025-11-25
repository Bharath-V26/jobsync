import { Job } from "./mock-data";

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const BASE_URL = "https://api.adzuna.com/v1/api/jobs";

export async function searchJobs(
    country: string = "us",
    page: number = 1,
    what: string = "developer",
    where: string = "san francisco"
): Promise<Job[]> {
    if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
        console.warn("Adzuna API keys missing. Returning mock data.");
        return []; // Return empty to trigger fallback in the route handler
    }

    try {
        const response = await fetch(
            `${BASE_URL}/${country}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(
                what
            )}&where=${encodeURIComponent(where)}&content-type=application/json`
        );

        if (!response.ok) {
            throw new Error(`Adzuna API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.results.map(mapAdzunaJobToJob);
    } catch (error) {
        console.error("Failed to fetch jobs from Adzuna:", error);
        return [];
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAdzunaJobToJob(adzunaJob: any): Job {
    return {
        id: adzunaJob.id,
        title: adzunaJob.title,
        company: adzunaJob.company.display_name,
        location: adzunaJob.location.display_name,
        type: adzunaJob.contract_time === "full_time" ? "Full-time" : "Contract",
        salary: adzunaJob.salary_min
            ? `$${Math.round(adzunaJob.salary_min)} - $${Math.round(adzunaJob.salary_max)}`
            : "Competitive",
        postedAt: new Date(adzunaJob.created).toLocaleDateString(),
        description: adzunaJob.description,
        logo: "bg-gray-500", // Adzuna doesn't provide logos easily
        source: "Adzuna",
        matchScore: Math.floor(Math.random() * 30) + 70, // Mock match score
    };
}
