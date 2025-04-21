import React from "react"
import { Button } from "@/components/ui/button"
import { ChartLine } from "lucide-react"

interface HeaderProps {
    isLoggedIn: boolean
    handleLogout: () => void
}
  
export default function Header({ isLoggedIn, handleLogout }: HeaderProps) {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <ChartLine size={32} className="text-emphasis" />
                    <h1 className="text-3xl font-bold text-emphasis">Bodyweight Tracker</h1>
                </div>
                {isLoggedIn && <Button variant="outline" onClick={handleLogout}>Log out</Button>}
                
            </div>
        </header>
    )
}
  