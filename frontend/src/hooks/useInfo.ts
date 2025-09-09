import axios from "axios"
import { useState } from "react"

export function useInfo(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [userInfo, setUserInfo] = useState<any>([])

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const getUserInfo = async (userId: string) => {
        try {
            setLoading(true)
            const res = await axios.get(`${BACKEND_URL}/user/${userId}`)
            setUserInfo(res.data.user)
        } catch (error) {
            setError("error fetching user")
        }
    }

    return {
        getUserInfo,
        loading,
        error,
        userInfo
    }
}