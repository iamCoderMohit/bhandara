import axios from "axios"
import { auth } from "../config/firebaseconfig"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPostComments } from "../features/commentSlice"

export function useComment(){
    const [commentError, setCommentError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const username = useSelector((state: any) => state.user.userInfo.username)

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const postComment = async (content: string, postId: string) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/comment/create/${postId}`, {content, username}, {
                headers: {
                    Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
                }
            })
        } catch (error) {
            setCommentError("cant comment, try again")
        }
    }

    const getAllComments = async (postId: string) => {
        try {
            setLoading(true)
            const res = await axios.get(`${BACKEND_URL}/comment/all/${postId}`, {
                headers: {
                    Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
                }
            })
            dispatch(setPostComments(res.data.comments))
        } catch (error) {
            setCommentError("cant fetch comments, try again")
        } finally{
            setLoading(false)
        }
    }

    return {
        postComment,
        commentError,
        getAllComments,
        loading
    }
}