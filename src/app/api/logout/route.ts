import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    cookies().delete('user')

    return NextResponse.json('Logout', {
        status: 200
    })
}