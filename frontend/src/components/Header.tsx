import React from "react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
    isLoggedIn: boolean
    handleLogout: () => void
}
  
export default function Header({ isLoggedIn, handleLogout }: HeaderProps) {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-center">bodyweighttracker.xyz</h1>
                {isLoggedIn && <Button variant="outline" onClick={handleLogout}>Log out</Button>}
            </div>
        </header>
    )
}
  