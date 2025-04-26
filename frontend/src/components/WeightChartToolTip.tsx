import React from 'react'

type WeightChartTooltipProps = {
	active?: boolean;
	payload?: any[];
}

const WeightChartTooltip = ({ active, payload }: WeightChartTooltipProps) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		const date = new Date(data.date);
		const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
		
		return (
			<div className="rounded-lg border bg-background p-2 shadow-sm">
				<div className="flex flex-col items-center">
					<span className="text-base">
						{data.weight} kg
					</span>
					<span className="text-sm text-muted-foreground">
						{formattedDate}
					</span>
				</div>
			</div>
		);
	}
	
	return null;
};

export { WeightChartTooltip }