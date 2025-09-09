import { useState } from "react";
import WithBgLayout from "./WithBgLayout";
import { useAuth } from "../hooks/useAuth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { Link, useNavigate } from "react-router";
import Button from "./Button";
import Toast from "./Toast";
import { IoIosWarning } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCurrentUserInfo, setUserIsLoggedIn } from "../features/authSlice";
import { createUser } from "../utils/createUser";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading, error } = useAuth();
  const [toast, setToast] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const provider = new GoogleAuthProvider();

  async function handleGoogleSignin() {
    try {
      const res = await signInWithPopup(auth, provider);
      await createUser(res.user.uid, res.user.email!);
      dispatch(setUserIsLoggedIn(true),
      dispatch(setCurrentUserInfo(res.user.uid))) 
      navigate("/feed");
    } catch (error) {
      console.error(error);
      navigate("/signup");
    }
  }

  async function handleSignup() {
    try {
      const res = await signup(email, password);
    } catch (error) {
      console.error(error);
    } finally {
        setToast(true)
    }
  }
  return (
    <div>
      <WithBgLayout>
        {toast ? <Toast text={error ? error : "signed up!!"} icon={error ? <IoIosWarning /> : <FaCheck />} status={error ? false : true} setToast={setToast} /> : null}
        <div className="w-100 h-fit  backdrop-blur-lg border bg-[#FFBF78]/30 border-gray-800 rounded-md absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white p-5">
          <h1 className="text-center text-xl font-bold mb-5">
            Create your account
          </h1>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="">Enter your email*</label>
              <input
                type="email"
                required
                className="border border-gray-800 rounded-md pl-4 py-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Enter your password*</label>
              <input
                type="password"
                required
                className="border border-gray-800 rounded-md pl-4 py-1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button handler={handleSignup} text="Sign up" loading={loading} />

            <h1 className="text-center">OR</h1>

            <div
              className="flex gap-2 items-center mx-auto cursor-pointer"
              onClick={handleGoogleSignin}
            >
              <img
                src="https://img.icons8.com/?size=512&id=17949&format=png"
                width={40}
                alt=""
              />
              <div className="text-lg font-semibold">Sign in with Google</div>
            </div>

            <h1 className="text-center">
              already have an account?{" "}
              <Link to={"/signin"} className="text-blue-900 cursor-pointer">
                Sign in
              </Link>{" "}
              instead{" "}
            </h1>
          </div>
        </div>
      </WithBgLayout>
    </div>
  );
}

export default Signup;
