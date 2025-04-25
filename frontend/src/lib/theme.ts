/**
 * Theme utilities for the application
 */

/**
 * CSS variable for chart colors
 */
export const chartColors = {
	primary: "hsl(var(--chart-1))",
	secondary: "hsl(var(--chart-2))",
	tertiary: "hsl(var(--chart-3))",
	quaternary: "hsl(var(--chart-4))",
	quinary: "hsl(var(--chart-5))",
}

/**
 * Helper function to get the chart color by index
 */
export function getChartColor(index: number): string {
	const colorKeys = Object.keys(chartColors) as Array<keyof typeof chartColors>
	const colorKey = colorKeys[index % colorKeys.length] || 'primary'
	return chartColors[colorKey]
} 