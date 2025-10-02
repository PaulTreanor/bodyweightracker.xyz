import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Helmet from 'react-helmet'
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const FAQPage: React.FC<PageProps> = () => {
    const faqs = [
        {
            question: "What does bodyweighttracker.com do?",
            answer: "bodyweighttracker.com is a simple website that helps you log and monitor your body weight over time. It provides automatic charts to visualise your data and it can be accessed from your phone or computer. "
        },
        {
            question: "How do I track my weight online?",
            answer: "Create a free account, then log your weight daily by entering the number in kilograms or pounds. Your weight log is automatically saved and visualized in charts showing your progress over time."
        },
        {
            question: "Can I export my weight log data?",
            answer: "Yes! You can export your data as a CSV file at any time with the click of a button. This lets you analyse your data with ChatGPT, Excel, Google Sheets, or other tools"
        },
        {
            question: "Is this weight tracker really non-bloated?",
            answer: "Absolutely. We built this as a simple weight tracker focused solely on daily weight logging, charts, and CSV export. No ads, no unnecessary features, no social feeds—just a clean, fast online weight tracker that does one thing well."
        },
        {
            question: "Is my weight data private and secure?",
            answer: "Yes. Your weight log is stored securely and is only accessible to you. We use industry-standard encryption and authentication to protect your weight tracking data."
        },
        {
            question: "Do I need to download an app?",
            answer: "No download required! Our online weight tracker works entirely in your web browser on any device—desktop, tablet, or mobile. Just visit bodyweighttracker.com and start tracking."
        },
        {
            question: "Can I track weight in both kg and lbs?",
            answer: "Yes, you can log your weight in either kilograms or pounds. The weight tracker accepts both units, so you can use whatever measurement system you prefer."
        },
        {
            question: "Is the weight tracker free?",
            answer: "Yes, our online weight tracker is completely free to use. No subscription fees, no premium tiers—just free, simple daily weight logging."
        },
    ]

	return (
		<div className="min-h-screen">
			<Header isLoggedIn={false} handleLogout={() => {}} showGetStarted={true}/>
			<main className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-4xl font-bold font-varela-round text-foreground mb-4">
					Frequently Asked Questions
				</h1>
				<p className="text-muted-foreground mb-8 text-lg">
					Everything you need to know about our simple online weight tracker
				</p>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<Card key={index}>
							<CardHeader>
								<CardTitle className="font-varela-round text-xl">
									{faq.question}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground leading-relaxed">
									{faq.answer}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				<Card className="mt-8 bg-muted/50">
					<CardHeader>
						<CardTitle className="font-varela-round">Still have questions?</CardTitle>
						<CardDescription>
							Ready to start tracking your weight? <a href="/" className="text-link hover:underline font-medium">Get started now</a> with our free online weight tracker.
						</CardDescription>
					</CardHeader>
				</Card>
			</main>
		</div>
	)
}

export default FAQPage

export const Head: HeadFC = () => (
	<>
		<title>FAQ - Weight Tracker Questions | Simple Online Weight Logging</title>
		<Helmet>
			<link rel="icon" href="/favicon.ico" />

			{/* Primary Meta Tags */}
			<meta name="title" content="FAQ - Weight Tracker Questions | Simple Online Weight Logging" />
			<meta name="description" content="Frequently asked questions about our simple online weight tracker. Learn about daily weight logging, CSV export, and how to track your weight log online." />
			<meta name="keywords" content="weight tracker faq, online weight tracker questions, how to track weight online, weight log export, daily weight logging" />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://bodyweighttracker.com/faq" />
			<meta property="og:title" content="FAQ - Weight Tracker Questions | Simple Online Weight Logging" />
			<meta property="og:description" content="Frequently asked questions about our simple online weight tracker. Learn about daily weight logging and CSV export." />

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://bodyweighttracker.com/faq" />
			<meta property="twitter:title" content="FAQ - Weight Tracker Questions | Simple Online Weight Logging" />
			<meta property="twitter:description" content="Frequently asked questions about our simple online weight tracker. Learn about daily weight logging and CSV export." />

			{/* Additional SEO */}
			<meta name="robots" content="index, follow" />
			<link rel="canonical" href="https://bodyweighttracker.com/faq" />

			{/* Schema.org FAQ structured data */}
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "FAQPage",
					"mainEntity": [
						{
							"@type": "Question",
							"name": "What is an online weight tracker?",
							"acceptedAnswer": {
								"@type": "Answer",
								"text": "An online weight tracker is a web-based application that helps you log and monitor your body weight over time. Unlike traditional paper logs or spreadsheets, an online weight tracker provides automatic chart visualization, data persistence, and easy access from any device with internet connectivity."
							}
						},
						{
							"@type": "Question",
							"name": "How do I track my weight online?",
							"acceptedAnswer": {
								"@type": "Answer",
								"text": "To track your weight online with our simple weight tracker, create a free account, then log your weight daily by entering the number in kilograms or pounds. Your weight log is automatically saved and visualized in charts showing your progress over time."
							}
						},
						{
							"@type": "Question",
							"name": "Can I export my weight log data?",
							"acceptedAnswer": {
								"@type": "Answer",
								"text": "Yes! Our weight tracker includes CSV export functionality. You can download your complete weight log history as a CSV file anytime, giving you full control over your data."
							}
						},
						{
							"@type": "Question",
							"name": "Is this weight tracker really non-bloated?",
							"acceptedAnswer": {
								"@type": "Answer",
								"text": "Absolutely. We built this as a simple weight tracker focused solely on daily weight logging, charts, and CSV export. No ads, no unnecessary features, no social feeds—just a clean, fast online weight tracker that does one thing well."
							}
						}
					]
				})}
			</script>
		</Helmet>
	</>
)
