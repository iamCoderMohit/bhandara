import axios from "axios"
import { useState } from "react"
import { auth } from "../config/firebaseconfig"
import { useDispatch } from "react-redux"
import { setUserInfo } from "../features/userSlice"

export function useEdit(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const uid = auth.currentUser!.uid
    const dispatch = useDispatch()
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const editDetails = async (username: string, fullName: string, bio: string) => {
        try {
            setLoading(true)
            const res = await axios.put(`${BACKEND_URL}/user/edit`, {uid, username, fullName, bio})
            dispatch(setUserInfo(res.data.user))
        } catch (error) {
            setError("can't edit details, try again")
        } finally{
            setLoading(false)
        }
    }

    return {
        editDetails,
        loading,
        error
    }
}