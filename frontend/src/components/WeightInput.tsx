import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
        <form onSubmit={handleSubmit} className="mb-8 flex items-center justify-center space-x-2">
            <label htmlFor="weight" className="text-lg font-medium font-varela-round">
                What is your weight today?
            </label>
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
        </form>
    )
}
