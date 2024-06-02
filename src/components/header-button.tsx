import {LogoutButton} from "@/components/logout-button";

type User = {
    id: number,
    email: string,
    role: 'user' | 'admin',
    password: string
}

export default function HeaderButton({user}: { user: User | null }) {
    console.log('gg', user)
    return user && <LogoutButton/>
}