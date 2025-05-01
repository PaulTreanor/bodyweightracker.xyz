import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"
import { formatDate, exportToCsv } from "../utils/dataHistoryViewerUtils"
import type { WeightEntry } from "../types"

type DataHistoryViewerProps = {
	data: WeightEntry[]
}

export default function DataHistoryViewer({ data }: DataHistoryViewerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isExporting, setIsExporting] = useState(false)

	return (
		<Card className="w-full max-w-[850px] mx-auto mb-8">
			<CardHeader>
				<div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
					<CardTitle className="font-varela-round">Data History</CardTitle>
					<div className="flex gap-2 pt-2 sm:pt-0">
						{data.length > 0 && (
							<Button 
								onClick={() => exportToCsv({
									setIsExporting,
									data
								})} 
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
						<table className="min-w-full divide-y divide-border">
							<thead className="sticky top-0">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
										Weight (kg)
									</th>
								</tr>
							</thead>
							<tbody className="bg-card divide-y divide-border">
								{[...data]
									.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
									.map((entry, index) => (
										<tr key={entry.date} className={index % 2 === 0 ? "bg-muted" : "bg-card"}>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
												{formatDate(entry.date)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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