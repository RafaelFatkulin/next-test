import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export function middleware(request: NextRequest, response: NextResponse) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login'

    const user = request.cookies.get("user")?.value || ""
    console.log('user', user)

    if(isPublicPath && user) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if(path === '/' && (isPublicPath && user)) {
        return NextResponse.next()
    }

    if(!isPublicPath && !user) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/login'
    ]
}