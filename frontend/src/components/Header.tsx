import React from "react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
    isLoggedIn: boolean
    handleLogout: () => void
    showGetStarted?: boolean
}

export default function Header({ isLoggedIn, handleLogout, showGetStarted = false }: HeaderProps) {
    return (
        <header className="bg-card shadow">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-1">
                    {/* <div className="relative flex items-center justify-center] -mt-[1px]">
                        <img
                            src={bodyweightIcon}
                            alt="Bodyweight Tracker"
                            className="w-8 h-8 text-primary"
                        />
                    </div> */}
                    <a href="/" className="text-2xl font-varela-round font-bold text-primary hover:text-primary/90 transition-colors">
                        bodyweight tracker
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    {showGetStarted && (
                        <a href="/">
                            <Button className="font-varela-round">Get started today!</Button>
                        </a>
                    )}
                    {isLoggedIn && <Button variant="outline" onClick={handleLogout}>Log out</Button>}
                </div>
            </div>
        </header>
    )
}
  