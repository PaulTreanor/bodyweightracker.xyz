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
		<title>Simple Online Weight Tracker - Daily Weight Log with CSV Export</title>
		<Helmet>
			<link rel="icon" href="/favicon.ico" />

			{/* Primary Meta Tags */}
			<meta name="title" content="Simple Online Weight Tracker - Daily Weight Log with CSV Export" />
			<meta name="description" content="Free online weight tracker for simple daily weight logging. Track your weight log with beautiful charts and CSV export. No bloat, just a clean weight tracker that works." />
			<meta name="keywords" content="weight tracker, online weight tracker, simple weight tracker, weight log, daily weight logging, CSV export, bodyweight tracker, weight tracking app" />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://bodyweighttracker.com/" />
			<meta property="og:title" content="Simple Online Weight Tracker - Daily Weight Log with CSV Export" />
			<meta property="og:description" content="Free online weight tracker for simple daily weight logging. Track your weight log with beautiful charts and CSV export." />
			<meta property="og:image" content="https://bodyweighttracker.com/og-image.png" />

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://bodyweighttracker.com/" />
			<meta property="twitter:title" content="Simple Online Weight Tracker - Daily Weight Log with CSV Export" />
			<meta property="twitter:description" content="Free online weight tracker for simple daily weight logging. Track your weight log with beautiful charts and CSV export." />
			<meta property="twitter:image" content="https://bodyweighttracker.com/og-image.png" />

			{/* Additional SEO */}
			<meta name="robots" content="index, follow" />
			<meta name="language" content="English" />
			<meta name="author" content="Bodyweight Tracker" />
			<link rel="canonical" href="https://bodyweighttracker.com/" />

			{/* Schema.org structured data */}
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebApplication",
					"name": "Bodyweight Tracker",
					"description": "Simple online weight tracker for daily weight logging with CSV export. Non-bloated weight tracking application.",
					"applicationCategory": "HealthApplication",
					"operatingSystem": "Web",
					"offers": {
						"@type": "Offer",
						"price": "0",
						"priceCurrency": "USD"
					},
					"featureList": [
						"Daily weight logging",
						"Weight trend charts",
						"CSV export",
						"Simple and non-bloated interface",
						"Online weight tracker"
					]
				})}
			</script>
		</Helmet>
	</>
)
