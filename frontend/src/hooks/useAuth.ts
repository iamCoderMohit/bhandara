import axios from "axios"
import { useState } from "react"

export function useAuth(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const signin = async (email: string, password: string) => {
        try {
            setLoading(true)
            const res = await axios.post(`${BACKEND_URL}/user/signin`, {email, password})
        } catch (error) {
            setError("error loggin in")
        }
    }

    return {
        signin,
        loading,
        error
    }
}