import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth'

type IsAuthenticated = (isAuthenticated: boolean) => void

const getAuthToken = async (): Promise<string | null> => {
	try {
		const session = await fetchAuthSession()
		return session.tokens?.idToken?.toString() || null
	} catch (error) {
		console.error('Error getting auth token:', error)
		return null
	}
}

const checkAuthStatus = async (setIsAuthenticated: IsAuthenticated) => {
    try {
        const user = await getCurrentUser()
        setIsAuthenticated(true)
    } catch (error) {
        setIsAuthenticated(false)
    }
}

const handleLogout = async (setIsAuthenticated: IsAuthenticated) => {
    try {
        await signOut()
        setIsAuthenticated(false)
    } catch (error) {
        console.error('Error signing out:', error)
    }
}

export {
    checkAuthStatus,
    getAuthToken,
    handleLogout,
}