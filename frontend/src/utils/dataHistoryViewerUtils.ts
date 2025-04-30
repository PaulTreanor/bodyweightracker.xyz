import type { WeightEntry } from "../types"

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

const exportToCsv = ({
    setIsExporting,
    data
}: {
    setIsExporting: (value: boolean) => void,
    data: WeightEntry[]
}) => {
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


export {
    formatDate,
    exportToCsv,
}