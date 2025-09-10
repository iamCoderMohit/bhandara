import axios from "axios"
import { useState } from "react"
import { auth } from "../config/firebaseconfig"
import { useDispatch } from "react-redux"
import { updateCurrentUserInfo } from "../features/userSlice"

export function useInfo(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [userInfo, setUserInfo] = useState<any>([])
    const dispatch = useDispatch()

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

    const getCurrentUserInfo = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${BACKEND_URL}/user/me`, {
                headers: {
                    Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
                }
            })

            dispatch(updateCurrentUserInfo(res.data.user))
        } catch (error) {
            setError("error fetching details")
        }
    }

    return {
        getUserInfo,
        getCurrentUserInfo,
        loading,
        error,
        userInfo
    }
}