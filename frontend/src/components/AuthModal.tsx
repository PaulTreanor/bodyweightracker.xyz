import React, { useState } from "react"
import { signIn, signUp, confirmSignUp  } from 'aws-amplify/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConfirmSignupForm } from "./auth-modal/ConfirmSignupForm";
import { LoginForm } from "./auth-modal/LoginForm";
import { SignUpForm } from "./auth-modal/SignUpForm";
import type { LoginData, SignupData, VerificationData } from "@/types";

export function AuthModal({
	handleAuth
}: {
	handleAuth: () => void
}) {

	const [loginData, setLoginData] = useState<LoginData>({
		email: '',
		password: ''
	});
	
	const [signupData, setSignupData] = useState<SignupData>({
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [verificationData, setVerificationData] = useState<VerificationData>({
		email: '',
		code: ''
	});
	
	const [needsConfirmation, setNeedsConfirmation] = useState<boolean>(false);

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

	return (
		<Dialog open={true}>
			<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Login or Sign Up</DialogTitle>
				<DialogDescription>Enter your details to access your account or create a new one.</DialogDescription>
			</DialogHeader>
			
			{needsConfirmation ? (
				<ConfirmSignupForm
					handleConfirmSignup={handleConfirmSignup}
					verificationData={verificationData}
					setVerificationData={setVerificationData}
				/>
			) : (
				// Regular login/signup UI
				<Tabs defaultValue="login">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<LoginForm
						handleAuth={handleAuth}
						loginData={loginData}
						setLoginData={setLoginData}
					/>
				</TabsContent>
				<TabsContent value="signup">
					<SignUpForm
						handleSignup={handleSignup}
						signupData={signupData}
						setSignupData={setSignupData}
					/>
				</TabsContent>
				</Tabs>
			)}
			</DialogContent>
		</Dialog>
	)
}
