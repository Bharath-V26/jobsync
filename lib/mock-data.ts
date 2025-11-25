export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: "Full-time" | "Part-time" | "Contract" | "Remote";
    salary: string;
    postedAt: string;
    description: string;
    logo: string; // URL or placeholder color
    source: "LinkedIn" | "Indeed" | "Glassdoor" | "Direct" | "Adzuna";
    matchScore: number; // 0-100
}

export const mockJobs: Job[] = [
    {
        id: "1",
        title: "Senior Frontend Engineer",
        company: "TechCorp",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$150k - $180k",
        postedAt: "2h ago",
        description: "We are looking for a Senior Frontend Engineer to lead our core product team. You will be working with React, Next.js, and TypeScript...",
        logo: "bg-blue-500",
        source: "LinkedIn",
        matchScore: 95,
    },
    {
        id: "2",
        title: "Product Designer",
        company: "DesignStudio",
        location: "Remote",
        type: "Contract",
        salary: "$80/hr",
        postedAt: "5h ago",
        description: "Join our award-winning design team. We need someone with a strong portfolio in UI/UX and design systems...",
        logo: "bg-purple-500",
        source: "Indeed",
        matchScore: 88,
    },
    {
        id: "3",
        title: "Backend Developer",
        company: "DataSystems",
        location: "New York, NY",
        type: "Full-time",
        salary: "$130k - $160k",
        postedAt: "1d ago",
        description: "Scaling our backend infrastructure using Go and Kubernetes. Experience with microservices is a plus...",
        logo: "bg-green-500",
        source: "Direct",
        matchScore: 75,
    },
    {
        id: "4",
        title: "Marketing Manager",
        company: "GrowthHacks",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$100k - $120k",
        postedAt: "2d ago",
        description: "Lead our growth marketing initiatives. You should be data-driven and creative...",
        logo: "bg-orange-500",
        source: "Glassdoor",
        matchScore: 60,
    },
];
