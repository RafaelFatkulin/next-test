'use client'

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export const LogoutButton = () => {
    const router= useRouter()
    const handleLogout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST'
        })

        console.log(res)

        if(res.ok) {
            router.push('/login')
        }
    }

    return <Button onClick={handleLogout}>Выйти</Button>
}