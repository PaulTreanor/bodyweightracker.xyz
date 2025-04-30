import React from 'react'
import { Button } from "@/components/ui/button"
import type { TimeRange } from "../types"

type WeightChartTimeSelectorButtonsProps = {
	timeRange: TimeRange
	setTimerange: (timeRange: TimeRange) => void
}

const WeightChartTimeSelectorButtons = ({ timeRange, setTimerange }: WeightChartTimeSelectorButtonsProps) => {
	return (
		<div className="flex gap-2">
			<Button
				onClick={() => setTimerange('all')}
				variant={timeRange === 'all' ? 'default' : 'secondary'}
				size="sm"
			>
				All Time
			</Button>
			<Button
				onClick={() => setTimerange('12m')}
				variant={timeRange === '12m' ? 'default' : 'secondary'}
				size="sm"
			>
				12 Months
			</Button>
			<Button
				onClick={() => setTimerange('3m')}
				variant={timeRange === '3m' ? 'default' : 'secondary'}
				size="sm"
			>
				3 Months
			</Button>
		</div>
	)
}

export {
	WeightChartTimeSelectorButtons
}