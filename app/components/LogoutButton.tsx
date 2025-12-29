"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

async function handleLogout() {
    await signOut({
        callbackUrl: "/login",
    })
}

export default function Logout(){
    return <div className="border-2">
        <Button onClick={handleLogout} variant="outline" className="w-full">Logut</Button>
    </div>
}