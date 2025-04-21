import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"
import type { WeightEntry } from "../types"

type DataHistoryViewerProps = {
	data: WeightEntry[]
}

export default function DataHistoryViewer({ data }: DataHistoryViewerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    
    const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
	}

    const exportToCsv = () => {
        setIsExporting(true)
        
        try {
            const sortedData = [...data].sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            
            const csvContent = [
                ['Date', 'Weight (kg)'],
                ...sortedData.map(entry => [
                    new Date(entry.date).toISOString().split('T')[0], // Format date as YYYY-MM-DD
                    entry.weight.toString()
                ])
            ]
            .map(row => row.join(','))
            .join('\n')
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
            
            const now = new Date()
            const fileName = `weight-data-${now.toISOString().split('T')[0]}.csv`
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            
            document.body.appendChild(link)
            link.click()
            
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error exporting CSV:', error)
        } finally {
            setIsExporting(false)
        }
    }

	return (
		<Card className="w-full max-w-[900px] mx-auto mb-8">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Data History</CardTitle>
					<div className="flex gap-2">
						{data.length > 0 && (
							<Button 
								onClick={exportToCsv} 
								variant="outline" 
								className="flex items-center gap-2"
								disabled={isExporting}
							>
								<Download size={16} />
								{isExporting ? 'Exporting...' : 'Export CSV'}
							</Button>
						)}
						<Button onClick={() => setIsOpen(!isOpen)}>
							{isOpen ? "Hide" : "Show"}
						</Button>
					</div>
				</div>
			</CardHeader>
			{isOpen && (
				<CardContent>
					<div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50 sticky top-0">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Weight (kg)
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{[...data]
									.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
									.map((entry, index) => (
										<tr key={entry.date} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{formatDate(entry.date)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
												{entry.weight}
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</CardContent>
			)}
		</Card>
	)
}