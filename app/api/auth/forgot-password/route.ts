import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Always return success to prevent email enumeration
        if (!user) {
            return NextResponse.json({
                message: "If an account exists with this email, a password reset link has been sent."
            });
        }

        // Generate secure random token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600000); // 1 hour from now

        // Store token in database
        await prisma.passwordResetToken.create({
            data: {
                email,
                token,
                expires,
            },
        });

        // For now, log the reset link to console
        // In production, send this via email
        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const resetLink = `${baseUrl}/reset-password?token=${token}`;
        console.log("\n🔐 PASSWORD RESET LINK 🔐");
        console.log("==========================");
        console.log(`Email: ${email}`);
        console.log(`Link: ${resetLink}`);
        console.log("==========================\n");

        return NextResponse.json({
            message: "If an account exists with this email, a password reset link has been sent."
        });
    } catch (error) {
        console.error("[FORGOT_PASSWORD]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
