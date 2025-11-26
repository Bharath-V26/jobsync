import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const savedJobs = await prisma.savedJob.findMany({
            where: { userId: session.user.id },
            orderBy: { savedAt: "desc" },
        })

        // Transform SavedJob to Job format expected by JobCard
        const jobs = savedJobs.map(saved => ({
            id: saved.jobId,
            title: saved.title,
            company: saved.company,
            location: saved.location || "Not specified",
            salary: saved.salary || "Not specified",
            type: "Full-time", // Default
            description: saved.description || "",
            postedAt: new Date(saved.savedAt).toLocaleDateString(),
            logo: "bg-gradient-to-r from-blue-500 to-purple-500",
            matchScore: 75, // Default
            url: saved.url || "#",
        }))

        return NextResponse.json(jobs)
    } catch (error) {
        console.error("[SAVED_JOBS_GET]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { jobId, title, company, location, salary, description, url } = body

        if (!jobId || !title || !company) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const savedJob = await prisma.savedJob.create({
            data: {
                userId: session.user.id,
                jobId: String(jobId),
                title,
                company,
                location,
                salary,
                description,
                url,
            },
        })

        return NextResponse.json(savedJob)
    } catch (error) {
        console.error("[SAVED_JOBS_POST]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth()
        const { searchParams } = new URL(req.url)
        const jobId = searchParams.get("jobId")

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!jobId) {
            return NextResponse.json({ error: "Job ID required" }, { status: 400 })
        }

        await prisma.savedJob.deleteMany({
            where: {
                userId: session.user.id,
                jobId: jobId,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[SAVED_JOBS_DELETE]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
