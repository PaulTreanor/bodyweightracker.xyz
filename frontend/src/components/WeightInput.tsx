import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type WeightInputProps = {
    onAddWeight: (weight: number) => void
}

export default function WeightInput({ onAddWeight}: WeightInputProps) {
    const [weight, setWeight] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAddWeight(Number.parseFloat(weight))
        setWeight("")
    }

    return (
        <Card className="w-full max-w-[850px] mx-auto mb-8">
			<CardHeader className="px-4 sm:px-6">
				<div className="flex items-center justify-between">
					<CardTitle className="font-varela-round">Today's Weight</CardTitle>
				</div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="mb-6">
                    <label htmlFor="weight" className="font-varela-round">
                        Your weight in kg or lbs
                    </label>
                    <div className="pt-4 flex space-x-2">
                        <Input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-24"
                            step="0.1"
                            required
                        />
                        <Button type="submit" className="font-varela-round">Add Weight</Button>
                        </div>
                </form>
            </CardContent>
        </Card>
    )
}
