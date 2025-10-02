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
import { AuthModalContent } from "./auth-modal/AuthModalContent";
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
			<DialogContent className="sm:max-w-[900px] max-w-[95vw]">
			{needsConfirmation ? (
				<>
					<DialogHeader>
						<DialogTitle>Verify Your Email</DialogTitle>
						<DialogDescription>Enter the verification code sent to your email.</DialogDescription>
					</DialogHeader>
					<ConfirmSignupForm
						handleConfirmSignup={handleConfirmSignup}
						verificationData={verificationData}
						setVerificationData={setVerificationData}
					/>
				</>
			) : (
				<div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
					{/* Left column: SEO content (bottom on mobile) */}
					<AuthModalContent />

					{/* Right column: Auth forms (top on mobile) */}
					<div className="pb-8 md:pb-0 border-b md:border-b-0 border-border">
						<DialogHeader className="mb-4">
							<DialogTitle>Get Started</DialogTitle>
							<DialogDescription>Create an account or sign in to start tracking your weight today.</DialogDescription>
						</DialogHeader>

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
					</div>
				</div>
			)}
			</DialogContent>
		</Dialog>
	)
}
