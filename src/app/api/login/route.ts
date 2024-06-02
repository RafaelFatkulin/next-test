import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

const users = [
    {
        id: 1,
        email: 'user@user.com',
        password: '12345',
        role: 'user'
    },
    {
        id: 2,
        email: 'admin@admin.com',
        password: '67890',
        role: 'admin'
    },
]

type User = {
    id: number,
    email: string,
    role: 'user' | 'admin',
    password: string
}

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const {email, password} = await request.json()

        const user = users.find(user => user.email === email)

        if(!user || user.password !== password) {
            throw new Error('Введены неверные данные')
        }

        cookies().set('user', JSON.stringify(user), {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24
        })

        return Response.json({email, password})
    } catch (e: any) {
        return new NextResponse(JSON.stringify({ error: e.message }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}