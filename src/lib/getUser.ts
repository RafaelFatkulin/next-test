'use server';

import {cookies} from "next/headers";


type User = {
    id: number,
    email: string,
    role: 'user' | 'admin',
    password: string
}

export default async function getUserSession() {
    const cookieStore = cookies()

    const user: User | null = cookieStore.get('user') ? JSON.parse(cookieStore.get('user')?.value || '') : null

    return {user}
}