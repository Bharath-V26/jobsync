import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const applications = await prisma.application.findMany({
            where: { userId: session.user.id },
            orderBy: { updatedAt: "desc" },
        })

        return NextResponse.json(applications)
    } catch (error) {
        console.error("[APPLICATIONS_GET]", error)
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
        const { jobTitle, company, location, salary, jobUrl, status, notes } = body

        if (!jobTitle || !company) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const application = await prisma.application.create({
            data: {
                userId: session.user.id,
                jobTitle,
                company,
                location,
                salary,
                jobUrl,
                status: status || "applied",
                notes,
            },
        })

        return NextResponse.json(application)
    } catch (error) {
        console.error("[APPLICATIONS_POST]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth()
        const body = await req.json()
        const { id, status, notes } = body

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 })
        }

        const application = await prisma.application.update({
            where: {
                id,
                userId: session.user.id, // Ensure ownership
            },
            data: {
                status,
                notes,
            },
        })

        return NextResponse.json(application)
    } catch (error) {
        console.error("[APPLICATIONS_PATCH]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 })
        }

        await prisma.application.delete({
            where: {
                id,
                userId: session.user.id,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[APPLICATIONS_DELETE]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
