import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const profile = await prisma.profile.findUnique({
            where: { userId: session.user.id },
        })

        return NextResponse.json(profile || {})
    } catch (error) {
        console.error("[PROFILE_GET]", error)
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
        const { fullName, phone, location, portfolio, summary, skills, experience, education } = body

        const profile = await prisma.profile.upsert({
            where: { userId: session.user.id },
            update: {
                fullName,
                phone,
                location,
                portfolio,
                summary,
                skills,
                experience,
                education,
            },
            create: {
                userId: session.user.id,
                fullName,
                phone,
                location,
                portfolio,
                summary,
                skills,
                experience,
                education,
            },
        })

        return NextResponse.json(profile)
    } catch (error) {
        console.error("[PROFILE_POST]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
