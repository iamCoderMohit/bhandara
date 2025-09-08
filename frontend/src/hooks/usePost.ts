import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAllPosts, setPosts } from "../features/postSlice";
import { auth } from "../config/firebaseconfig";
import { useNavigate } from "react-router";

export function usePosts() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [postLoading, setLoading] = useState(false);
  const [postError, setError] = useState<string | null>(null);

  const navigate = useNavigate()
  const dispatch = useDispatch();

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
      formData.append("address", address); //create feed with showing images, and profile page has bugs not showing posts of a user
      formData.append("description", description);
      formData.append("location", JSON.stringify(location));

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

  return {
    getUserPosts,
    getAllPosts,
    uploadPost,
    postLoading,
    postError,
  };
}
