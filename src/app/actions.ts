import {cookies} from "next/headers";

type User = {
    id: number,
    email: string,
    role: 'user' | 'admin',
    password: string
}

export async function getSession(): Promise<User | null> {
    const user = cookies().get('user')?.value;

    if (!user) {
        return null;
    }

    return JSON.parse(user)
}