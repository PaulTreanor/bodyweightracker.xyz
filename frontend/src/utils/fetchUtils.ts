import type { WeightEntry } from "@/types"
import { ROOT_URL, WEIGHT_END_POINT } from "./endpoint"
import { getAuthToken } from "./authUtils"

const fetchWeightData = async (setWeightData: (weightData: WeightEntry[]) => void) => {
    try {
        const token = await getAuthToken()
        if (!token) {
            console.error('No auth token available')
            return
        }

        const response = await fetch(`${ROOT_URL}${WEIGHT_END_POINT}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        setWeightData(data.weightData)
    } catch (error) {
        console.error('Error fetching weight data:', error)
    }
}

const postWeightData = async (newEntry: WeightEntry): Promise<Response> => {
	const token = await getAuthToken()
	if (!token) {
		throw new Error('No auth token available')
	}

	const response = await fetch(`${ROOT_URL}${WEIGHT_END_POINT}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify([newEntry]),
	})
	return response
}

export {
    fetchWeightData,
    postWeightData
}
