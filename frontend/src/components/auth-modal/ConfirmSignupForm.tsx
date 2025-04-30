import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DialogFooter,
} from "@/components/ui/dialog"
import {resendSignUpCode  } from 'aws-amplify/auth';
import type { VerificationData } from "@/types";

const ConfirmSignupForm = ({
    handleConfirmSignup,
    verificationData,
    setVerificationData,
}: {
    handleConfirmSignup: (event: React.FormEvent) => void,
    verificationData: VerificationData,
    setVerificationData: React.Dispatch<React.SetStateAction<VerificationData>>,
}) => {
    
    const handleResendCode = async () => {
        try {
          await resendSignUpCode({
            username: verificationData.email
          });
          alert("Verification code resent to your email");
        } catch (err) {
          console.error('Error resending code:', err);
          alert("Error resending code. Please try again.");
        }
    }
    
    return (
        <div>
            <form onSubmit={handleConfirmSignup}>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="confirmation-email" className="text-right">
                        Email
                    </Label>
                    <Input 
                    id="confirmation-email" 
                    type="email" 
                    className="col-span-3" 
                    value={verificationData.email}
                    onChange={(e) => setVerificationData({
                        ...verificationData,
                        email: e.target.value
                    })}
                    readOnly
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="verification-code" className="text-right">
                        Code
                    </Label>
                    <Input 
                    id="verification-code" 
                    type="text" 
                    className="col-span-3" 
                    required
                    value={verificationData.code}
                    onChange={(e) => setVerificationData({
                        ...verificationData,
                        code: e.target.value
                    })}
                    placeholder="Enter verification code"
                    />
                </div>
                <div className="text-sm text-center text-muted-foreground">
                    Check your email for a verification code
                </div>
                </div>
                <DialogFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handleResendCode}>
                    Resend Code
                </Button>
                <Button type="submit">
                    Verify Account
                </Button>
                </DialogFooter>
            </form>
        </div>
    )
}


export {
    ConfirmSignupForm
}