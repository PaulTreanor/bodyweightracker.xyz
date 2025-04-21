import React, { useState, useRef } from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toPng } from "html-to-image"
import type { WeightEntry } from "../types"

type WeightChartProps = {
	data: WeightEntry[]
}

type TimeRange = 'all' | '12m' | '3m'

export default function WeightChart({ data }: WeightChartProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>('3m')
    const chartContainerRef = useRef<HTMLDivElement>(null)
    const [isDownloading, setIsDownloading] = useState(false)

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

    const downloadChart = () => {
        if (chartContainerRef.current === null) {
            return
        }
        
        setIsDownloading(true)
        
        // Wait for the next render cycle to ensure the download class is applied
        setTimeout(() => {
            const now = new Date()
            const fileName = `weight-chart-${now.toISOString().split('T')[0]}.png`
            
            // Apply styles that ensure SVG elements render properly
            const originalOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            
            const element = chartContainerRef.current
            
            if (!element) {
                setIsDownloading(false)
                return
            }
            
            toPng(element, { 
                cacheBust: true,
                quality: 1,
                backgroundColor: '#fff',
                width: element.offsetWidth,
                height: element.offsetHeight,
                skipFonts: true,
                pixelRatio: 2,
            })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = fileName
                link.href = dataUrl
                link.click()
                
                // Reset styles
                document.body.style.overflow = originalOverflow
                setIsDownloading(false)
            })
            .catch((err) => {
                console.error('Error downloading chart:', err)
                document.body.style.overflow = originalOverflow
                setIsDownloading(false)
            })
        }, 100)
    }

    return (
        <Card className="w-full max-w-[900px] mx-auto mb-8">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Weight Trend</CardTitle>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setTimeRange('all')}
                            className={`px-3 py-1 rounded ${
                                timeRange === 'all' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-secondary'
                            }`}
                        >
                            All Time
                        </button>
                        <button
                            onClick={() => setTimeRange('12m')}
                            className={`px-3 py-1 rounded ${
                                timeRange === '12m' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-secondary'
                            }`}
                        >
                            12 Months
                        </button>
                        <button
                            onClick={() => setTimeRange('3m')}
                            className={`px-3 py-1 rounded ${
                                timeRange === '3m' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-secondary'
                            }`}
                        >
                            3 Months
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div 
                    ref={chartContainerRef} 
                    className={`chart-container ${isDownloading ? 'downloading' : ''}`}
                >
                    <ChartContainer
                        config={{
                            weight: {
                                label: `Weight (kg)`,
                                color: "hsl(var(--chart-1))",
                            },
                        }}
                        className="h-[200px] sm:h-[300px] md:h-[400px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="date" 
                                    type="number"
                                    domain={['dataMin', 'dataMax']}
                                    scale="time"
                                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                                />
                                <YAxis
                                    domain={[
                                        (dataMin: number) => Math.max(0, dataMin - 10),
                                        (dataMax: number) => dataMax + 10,
                                    ]}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line 
                                    type="monotone" 
                                    dataKey="weight" 
                                    stroke="var(--color-weight)" 
                                    name="Weight"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    isAnimationActive={!isDownloading}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
                <div className="flex justify-end mt-4">
                    <Button 
                        onClick={downloadChart} 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-2"
                        disabled={isDownloading}
                    >
                        <Download size={16} />
                        {isDownloading ? 'Processing...' : 'Download Chart Image'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
