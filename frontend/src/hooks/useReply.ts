import axios from "axios";
import { useState } from "react";
import { auth } from "../config/firebaseconfig";

interface PostReplyProps{
    replyToUserId: string;
    commentId: string;
    postId: string;
    content: string;
    username: string
}

export function useReply(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [replies, setReplies] = useState([])

    const postReply = async ({replyToUserId, commentId, postId, content, username}: PostReplyProps) => {
        try {
            setLoading(true)
            const res = await axios.post(`${BACKEND_URL}/comment/reply`, {replyToUserId, commentId, content, username, postId}, {
                headers: {
                    Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
                }
            })
        } catch (error) {
            setError("cant post reply")
        } finally {
            setLoading(false)
        }
    }

    const getAllReplies = async (commentId: string, postId: string) => {
        try {
            setLoading(true)
            const res = await axios.get(`${BACKEND_URL}/comment/reply?commentId=${commentId}&postId=${postId}`, {
                headers: {
                    Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
                }
            })

            setReplies(res.data.replies)
        } catch (error) {
            setError("cant fetch replies")
        } finally {
            setLoading(false)
        }
    }

    return {
        postReply,
        loading,
        error,
        getAllReplies,
        replies
    }
}