import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    const isOnProfile = req.nextUrl.pathname.startsWith("/profile")
    const isOnFeed = req.nextUrl.pathname.startsWith("/feed")
    const isOnOnboarding = req.nextUrl.pathname.startsWith("/onboarding")
    const isAuthRoute = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup")

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        }
        return null
    }

    if (!isLoggedIn && (isOnDashboard || isOnProfile || isOnFeed || isOnOnboarding)) {
        let callbackUrl = req.nextUrl.pathname
        if (req.nextUrl.search) {
            callbackUrl += req.nextUrl.search
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl)
        return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl))
    }

    return null
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
