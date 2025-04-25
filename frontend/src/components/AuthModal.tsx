import React, { useState } from "react"
import { signIn, signUp, confirmSignUp, resendSignUpCode  } from 'aws-amplify/auth';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthModal({ handleAuth }: { handleAuth: () => void }) {

  const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});
	
	const [signupData, setSignupData] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [verificationData, setVerificationData] = useState({
		email: '',
		code: ''
	  });
	
	const [needsConfirmation, setNeedsConfirmation] = useState(false);


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

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (signupData.password !== signupData.confirmPassword) {
		  alert('Passwords do not match');
		  return;
		}
	
		try {
		  await signUp({
			username: signupData.email,
			password: signupData.password,
			options: {
			  userAttributes: {
				email: signupData.email,
			  }
			}
		  });
		  
		  setVerificationData({ email: signupData.email, code: '' });
		  setNeedsConfirmation(true);
		  
		} catch (err) {
		  console.error('Signup error:', err);
		  alert("Error creating account. Please try again.")
		}
	}
	
	const handleConfirmSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		
		try {
		  await confirmSignUp({
			username: verificationData.email,
			confirmationCode: verificationData.code
		  });
		  
		  // After confirmation, sign in automatically
		  try {
			await signIn({ 
			  username: verificationData.email, 
			  password: signupData.password 
			});
			handleAuth();
		  } catch (signInErr) {
			console.error('Auto sign-in error:', signInErr);
			alert("Account confirmed! Please sign in.");
			setNeedsConfirmation(false);
		  }
		} catch (err) {
		  console.error('Confirmation error:', err);
		  alert("Invalid verification code. Please try again.");
		}
	}
	
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
		<Dialog open={true}>
			<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Login or Sign Up</DialogTitle>
				<DialogDescription>Enter your details to access your account or create a new one.</DialogDescription>
			</DialogHeader>
			
			{needsConfirmation ? (
				// Confirmation UI
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
			) : (
				// Regular login/signup UI
				<Tabs defaultValue="login">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
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
				</TabsContent>
				<TabsContent value="signup">
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
				</TabsContent>
				</Tabs>
			)}
			</DialogContent>
		</Dialog>
	)
}
