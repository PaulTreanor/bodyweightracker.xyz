import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DialogFooter,
} from "@/components/ui/dialog"
import type { SignupData } from "@/types";


const SignUpForm = ({
    handleSignup,
    signupData,
    setSignupData,
}: {
    handleSignup: (event: React.FormEvent) => void,
    signupData: SignupData,
    setSignupData: React.Dispatch<React.SetStateAction<SignupData>>,
}) => {
    
    return (
        <form onSubmit={handleSignup}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="signup-email" className="text-right">
                    Email
                </Label>
                <Input 
                    id="signup-email" 
                    type="email" 
                    className="col-span-3" 
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({
                    ...signupData,
                    email: e.target.value
                    })}
                />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="signup-password" className="text-right">
                    Password
                </Label>
                <Input 
                    id="signup-password" 
                    type="password" 
                    className="col-span-3" 
                    required
                    value={signupData.password}
                    onChange={(e) => setSignupData({
                    ...signupData,
                    password: e.target.value
                    })}
                />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirm-password" className="text-right">
                    Confirm
                </Label>
                <Input 
                    id="confirm-password" 
                    type="password" 
                    className="col-span-3" 
                    required
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value
                    })}
                />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Sign Up</Button>
            </DialogFooter>
        </form>
    )
}


export {
    SignUpForm
}