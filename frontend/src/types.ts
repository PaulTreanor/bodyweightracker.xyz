type WeightEntry = {
    date: string
    weight: number
}
  
type TimeRange = 'all' | '12m' | '3m'

// AUTH FORM STATE TYPES
interface LoginData {
	email: string;
	password: string;
}

interface SignupData {
	email: string;
	password: string;
	confirmPassword: string;
}

interface VerificationData {
	email: string;
	code: string;
}
  
export {
    WeightEntry,
    TimeRange,
    LoginData,
    SignupData,
    VerificationData
}