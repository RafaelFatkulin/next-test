
import {CircleCheck} from 'lucide-react'
import Link from "next/link";
import {getSession} from "@/app/actions";
import HeaderButton from "@/components/header-button";

type User = {
    id: number,
    email: string,
    role: 'user' | 'admin',
    password: string
}

export default async function Header() {
    const user = await getSession()
    return <header className='py-4'>
        <div className="container flex flex-row items-center justify-between">
            <Link href={'/'} className=''>
                <CircleCheck className='size-10'/>
            </Link>

            <HeaderButton user={user} />
        </div>
    </header>
}