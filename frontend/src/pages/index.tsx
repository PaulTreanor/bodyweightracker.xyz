import React, { useState, useEffect } from "react"
import { checkAuthStatus, handleLogout } from '../utils/authUtils'
import type { HeadFC, PageProps } from "gatsby"
import Helmet from 'react-helmet'
import Header from "@/components/Header"
import WeightInput from "@/components/WeightInput"
import { WeightChart } from "@/components/WeightChart"
import DataHistoryViewer from "@/components/DataHistoryViewer"
import type { WeightEntry } from "@/types"
import { AuthModal } from "@/components/AuthModal"
import { fetchWeightData, postWeightData } from "../utils/fetchUtils"

const IndexPage: React.FC<PageProps> = () => {
	const [weightData, setWeightData] = useState<WeightEntry[]>([])
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	
	const addWeight = async (weight: number) => {
		const newEntry: WeightEntry = {
			date: new Date().toISOString(),
			weight: weight,
		}
		setWeightData([...weightData, newEntry])
		const response = await postWeightData(newEntry)
		const data = await response.json()
		console.log(data)
	}

	const handleAuth = () => {
		setIsAuthenticated(true)
	}

	useEffect(() => {
		checkAuthStatus(setIsAuthenticated)
	}, [])

	useEffect(() => {
		if (isAuthenticated) {
			fetchWeightData(setWeightData)
		}
	}, [isAuthenticated])


	return (
		<div className="min-h-screen">
		<Header isLoggedIn={isAuthenticated} handleLogout={() => handleLogout(setIsAuthenticated)}/>
			<main className="container mx-auto px-4 py-8 relative">
				<>	
					{!isAuthenticated &&
						<AuthModal
							handleAuth={handleAuth}
						/>
					}
					<div className={!isAuthenticated ? "blur-sm opacity-50" : ""}>
						<WeightInput onAddWeight={addWeight}/>
						<WeightChart data={weightData}/>
						<DataHistoryViewer data={weightData} />
					</div>
				</>
			</main>
	  </div>
	)
}

export default IndexPage

export const Head: HeadFC = () => (
	<>
		<title>Bodyweight Tracker</title>
		<Helmet>
			<link rel="icon" href="/favicon.ico" />
		</Helmet>
	</>
)
