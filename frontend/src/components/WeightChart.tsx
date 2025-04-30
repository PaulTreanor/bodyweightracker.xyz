import React, { useState, useRef, useMemo } from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { WeightChartTooltip } from "@/components/WeightChartToolTip"
import { Download } from "lucide-react"
import { chartColors } from "../lib/theme"
import type { WeightEntry, TimeRange } from "../types"
import { downloadChart } from '../utils/weightChartUtils'
import { WeightChartTimeSelectorButtons } from '@/components/WeightChartTimeSelectorButtons'

type WeightChartProps = {
	data: WeightEntry[]
}

const WeightChart = ({ data }: WeightChartProps) => {
	const [timeRange, setTimeRange] = useState<TimeRange>('3m')
	const chartContainerRef = useRef<HTMLDivElement>(null)
	const [isDownloading, setIsDownloading] = useState(false)

	const todayTimestamp = new Date().setHours(0, 0, 0, 0)
	
	const filteredData = data.filter(entry => {
		const entryDate = new Date(entry.date)
		const now = new Date()
		
		switch (timeRange) {
			case '12m':
				return entryDate >= new Date(now.setMonth(now.getMonth() - 12))
			case '3m':
				return entryDate >= new Date(now.setMonth(now.getMonth() - 3))
			default:
				return true
		}
	})
	
	const chartData = filteredData
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.map((entry) => ({
			date: new Date(entry.date).getTime(),
			weight: entry.weight
		}))

	// Define min and max for X axis
	const dataMinDate = chartData.length > 0 ? Math.min(...chartData.map(d => d.date)) : todayTimestamp
	const xAxisMax = todayTimestamp

	// Generate evenly spaced ticks
	const ticks = useMemo(() => {
		const tickCount = 5
		const range = xAxisMax - dataMinDate
		const step = range / (tickCount - 1)
		
		// Create array with precise values and ensure uniqueness
		const tickValues = Array.from({ length: tickCount }, (_, i) => {
			return Math.floor(dataMinDate + i * step)
		})
		
		// Ensure all tick values are unique by checking for duplicates
		return [...new Set(tickValues)]
	}, [dataMinDate, xAxisMax])

	return (
		<Card className="w-full max-w-[850px] mx-auto mb-8">
			<CardHeader className="px-4 sm:px-6">
				<div className="flex items-center justify-between">
					<CardTitle className="font-varela-round">Weight Trend</CardTitle>
					<WeightChartTimeSelectorButtons
						timeRange={timeRange}
						setTimerange={setTimeRange}
					/>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:px-4">
				<div 
					ref={chartContainerRef} 
					className={`chart-container w-full ${isDownloading ? 'downloading' : ''}`}
				>
					<ChartContainer
						config={{
							weight: {
								label: `Weight (kg)`,
								color: chartColors.primary,
							},
						}}
						className="h-[200px] sm:h-[300px] md:h-[400px] w-full"
					>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart 
								data={chartData} 
								margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis 
									dataKey="date" 
									type="number"
									domain={[dataMinDate, xAxisMax]}
									scale="time"
									ticks={ticks}
									tickFormatter={(timestamp) => {
										const date = new Date(timestamp);
										return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
									}}
									label={{ value: "Date", position: "insideBottom", offset: -10 }}
									className='pb-10'
								/>
								<YAxis
									domain={[
										(dataMin: number) => Math.max(0, dataMin - 4),
										(dataMax: number) => dataMax + 4,
									]}
									label={{ value: "(kg)", angle: -90, position: "insideLeft" }}
								/>
								<ChartTooltip 
									content={<WeightChartTooltip />}
								/>
								<Line 
									type="monotone" 
									dataKey="weight" 
									stroke={chartColors.primary} 
									name="Weight"
									strokeWidth={2}
									dot={{ r: 3 }}
									isAnimationActive={!isDownloading}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</div>
				<div className="flex justify-end mt-4">
					<Button 
						onClick={() => downloadChart({ setIsDownloading, chartContainerRef })} 
						variant="outline"
						className="flex items-center gap-2"
						disabled={isDownloading}
					>
						<Download size={16} />
						{isDownloading ? 'Processing...' : 'Save chart as image'}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export {
	WeightChart
}