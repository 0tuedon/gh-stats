import { NextRequest } from "next/server"
import NextAuth from "next-auth/next"
import { authOptions } from "./options"

const handler = NextAuth(authOptions)

function stripIss(req: NextRequest) {
    if (!req.nextUrl.searchParams.has("iss")) {
        return req
    }
    const url = req.nextUrl.clone()
    url.searchParams.delete("iss")
    return new NextRequest(url, req)
}

export async function GET(req: NextRequest, ctx: { params: { nextauth: string[] } }) {
    return handler(stripIss(req), ctx)
}

export async function POST(req: NextRequest, ctx: { params: { nextauth: string[] } }) {
    return handler(stripIss(req), ctx)
}
