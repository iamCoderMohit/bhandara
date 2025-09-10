import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { db } from "../config/firebaseconfig"
import { collection, getDocs, query, where } from "firebase/firestore"
import { setFollowingUsers } from "../features/friendSlice"

export function useFollow(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const [followLoading, setLoading] = useState(false)
    const [followError, setError] = useState<string | null>(null)

    const dispatch = useDispatch()

    const userInfo = useSelector((state: any) => state.user.userInfo)

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

    const getFollowingUser = async () => {
        try {
            setLoading(true)
            if(!userInfo.following || userInfo.following === 0) return;

            const q = query(collection(db, "users"), where("__name__", "in", userInfo.following))
            const snapshot = await getDocs(q)

            const result = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            dispatch(setFollowingUsers(result))
        } catch (error) {
            setError("cant find friends, try again")
        } finally{
            setLoading(false)
        }
    }

    return {
        followUser,
        unfollowUser,
        getFollowingUser,
        followLoading,
        followError
    }
}