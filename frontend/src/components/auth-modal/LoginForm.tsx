import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DialogFooter,
} from "@/components/ui/dialog"
import { signIn  } from 'aws-amplify/auth';
import type { LoginData } from "@/types";


const LoginForm = ({
    handleAuth,
    loginData,
    setLoginData,
}: {
    handleAuth: () => void,
    loginData: LoginData,
    setLoginData: React.Dispatch<React.SetStateAction<LoginData>>,
    }) => {
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log({loginData})
            await signIn({ username: loginData.email, password: loginData.password });
            handleAuth();
        } catch (err) {
            console.error('Login error:', err);
            alert("Invalid email or password")
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                    Email
                </Label>
                <Input 
                    id="email" 
                    type="email" 
                    className="col-span-3" 
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({
                    ...loginData,
                    email: e.target.value
                    })}
                />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                    Password
                </Label>
                <Input 
                    id="password" 
                    type="password" 
                    className="col-span-3" 
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({
                    ...loginData,
                    password: e.target.value
                    })}
                />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Login</Button>
            </DialogFooter>
        </form>
    )
}


export {
    LoginForm
}