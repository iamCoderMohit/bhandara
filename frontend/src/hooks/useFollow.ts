import axios from "axios"
import { useState } from "react"

export function useFollow(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const [followLoading, setLoading] = useState(false)
    const [followError, setError] = useState<string | null>(null)

    const followUser = async (userId: string, newFollower: string) => {
        try {
            setLoading(true)
            await axios.put(`${BACKEND_URL}/user/follow/${userId}`, {newFollower})
        } catch (error) {
            setError("cant follow, try again")
        } finally{
            setLoading(false)
        }
    }

    const unfollowUser = async (userId: string, unfollower: string) => {
        try {
            setLoading(true)
            await axios.put(`${BACKEND_URL}/user/unfollow/${userId}`, {unfollower})
        } catch (error) {
            setError("cant unfollow, try again")
        } finally{
            setLoading(false)
        }
    }

    return {
        followUser,
        unfollowUser,
        followLoading,
        followError
    }
}