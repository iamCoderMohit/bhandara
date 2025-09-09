import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setCurrentUserInfo, setUserIsLoggedIn } from "../features/authSlice";

export function useAuth() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/user/signin`, {
        email,
        password,
      });
      dispatch(setUserIsLoggedIn(true))
      dispatch(setCurrentUserInfo(res.data.user.uid))
      navigate('/feed')
    } catch (error) {
      setError("error logging in");
      navigate('/signin')
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/user/signup`, {
        email,
        password,
      });
      dispatch(setUserIsLoggedIn(true))
      dispatch(setCurrentUserInfo(res.data.user))
      navigate('/feed')
    } catch (error) {
      setError("error signing up, try again");
      navigate('/signup')
    } finally {
      setLoading(false);
    }
  };

  return {
    signin,
    signup,
    loading,
    error,
  };
}
