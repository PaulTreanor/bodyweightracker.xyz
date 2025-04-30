import { toPng } from "html-to-image"

const downloadChart = ({
    setIsDownloading,
    chartContainerRef
}: {
	setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>,
	chartContainerRef: React.RefObject<HTMLDivElement>
}) => {
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
            backgroundColor: 'hsl(var(--card))',
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

export {
    downloadChart
}