import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts, setOnePost, setPosts } from "../features/postSlice";
import { auth } from "../config/firebaseconfig";
import { useNavigate } from "react-router";

export function usePosts() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [postLoading, setLoading] = useState(false);
  const [postError, setError] = useState<string | null>(null);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const username = useSelector((state: any) => state.user.userInfo.username)

  const getUserPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/post/getAll`, {
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
      });
      dispatch(setPosts(res.data.posts));
    } catch (error) {
      setError("error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  //add pagination here later
  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/post/all`, {
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
      });

      dispatch(setAllPosts(res.data.posts));
    } catch (error) {
      setError("cant load feed");
    } finally {
      setLoading(false);
    }
  };

  const uploadPost = async (
    file: File | null,
    address: string,
    description: string,
    location: any
  ) => {
    try {
        setLoading(true)
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("address", address);
      formData.append("description", description);
      formData.append("location", JSON.stringify(location));
      formData.append("username", username);

      const res = await axios.post(`${BACKEND_URL}/post/create`, formData, {
        headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
        }
      });
      navigate('/feed')
    } catch (error) {
        setError("error uploading post")
    } finally{
        setLoading(false)
    }
  };

  const getOnePost = async (postId: string) => {
     try {
      setLoading(true)
      const res = await axios.get(`${BACKEND_URL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
        }
      })
      dispatch(setOnePost(res.data.post))
     } catch (error) {
      setError("cant fetch this post, try again")
     }
  }

  const likePost = async (postId: string) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/post/like/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
        }
      })
    } catch (error) {
      setError("cant like post")
    }
  }

  const dislikePost = async (postId: string) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/post/dislike/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
        }
      })
    } catch (error) {
      setError("cant like post")
    }
  }

  const [newUserPosts, setNewUserPosts] = useState([])

  const getNewUserPost = async (userId: string) => {
    try {
      setLoading(true)
      const res = await axios.get(`${BACKEND_URL}/post/userPosts/${userId}`, {
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
        }
      })
      setNewUserPosts(res.data.posts)
    } catch (error) {
      setError("cant fetch posts, try again")
    }
  }

  return {
    getUserPosts,
    getAllPosts,
    uploadPost,
    likePost,
    dislikePost,
    getOnePost,
    getNewUserPost,
    newUserPosts,
    postLoading,
    postError,
  };
}
