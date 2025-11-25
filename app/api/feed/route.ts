import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(posts)
    } catch (error) {
        console.error("[FEED_GET]", error)
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
        const { content } = body

        if (!content) {
            return NextResponse.json({ error: "Content required" }, { status: 400 })
        }

        const post = await prisma.post.create({
            data: {
                userId: session.user.id,
                content,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error("[FEED_POST]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
