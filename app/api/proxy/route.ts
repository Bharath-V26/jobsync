import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    try {
        const response = await fetch(url);
        const html = await response.text();

        // In a real app, we would parse the HTML here to extract specific fields.
        // For now, we just return a snippet or the title to prove it works.

        // Simple regex to get title
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : "No title found";

        return NextResponse.json({
            url,
            title,
            // content: html.substring(0, 500) + "..." // Truncated content
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch URL" }, { status: 500 });
    }
}
