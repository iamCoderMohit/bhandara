import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebaseconfig";
import { setUserIsLoggedIn } from "../features/authSlice";
import { IoReloadCircle } from "react-icons/io5";
import { usePosts } from "../hooks/usePost";
import { persistor } from "../store/store";
import { IoIosChatbubbles } from "react-icons/io";
import { useInfo } from "../hooks/useInfo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

function Navbar() {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { getAllPosts } = usePosts();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(false);

  async function handleClick() {
    await getAllPosts();
  }
  const { getCurrentUserInfo } = useInfo();

  async function rehydrateUserInfo() {
    await getCurrentUserInfo();
  }
  return (
    <div className="flex items-center justify-between md:justify-around  md:px-20 py-4 h-20">
      <div>
        <Link to={"/"}>
          <img src={logo} className="cursor-pointer md:w-50 w-30" alt="logo" />
        </Link>
      </div>
      <div>
        {!isLoggedIn && (
          <Link to={"/signin"}>
            <button className="text-white font-cream text-xl bg-orange-600 px-5 rounded-md cursor-pointer mr-5">
              Join Bros
            </button>
          </Link>
        )}

        {isLoggedIn && (
          <div className="md:hidden pr-10">
            <div className="text-white text-2xl flex items-center gap-5 z-50">
              <div
                className="text-white text-3xl cursor-pointer"
                onClick={() => {
                  rehydrateUserInfo();
                  navigate(`/chat`);
                }}
              >
                <IoIosChatbubbles />
              </div>
              <div
                className="text-white text-3xl cursor-pointer"
                onClick={handleClick}
              >
                <IoReloadCircle />
              </div>
              <div onClick={() => setPhone((prev) => !prev)}>
                {phone ? <MdCancel /> : <GiHamburgerMenu />}
              </div>
            </div>

            {phone && (
              <div>
                <div className="items-center flex justify-center gap-5 absolute w-full backdrop-blur-2xl py-5 z-40 left-0">
                  <Link to={"/feed"}>
                    <button className="text-white font-cream font-semibold bg-orange-600 px-5 py-1 rounded-md cursor-pointer">
                      Feed
                    </button>
                  </Link>

                  <button
                    className="text-white bg-blue-600 py-1 px-5 rounded-md cursor-pointer"
                    onClick={() => {
                      auth.signOut(),
                        dispatch({ type: "RESET" }),
                        persistor.purge(),
                        dispatch(setUserIsLoggedIn(false));
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {isLoggedIn && (
          <div className="md:flex items-center gap-5 hidden">
            <div
              className="text-white text-3xl cursor-pointer"
              onClick={() => (rehydrateUserInfo(), navigate(`/chat`))}
            >
              <IoIosChatbubbles />
            </div>
            <div
              className="text-white text-3xl cursor-pointer"
              onClick={handleClick}
            >
              <IoReloadCircle />
            </div>

            <Link to={"/feed"}>
              <button className="text-white font-cream font-semibold bg-orange-600 px-5 py-1 rounded-md cursor-pointer">
                Feed
              </button>
            </Link>

            <button
              className="text-white bg-blue-600 py-1 px-5 rounded-md cursor-pointer"
              onClick={() => {
                auth.signOut(),
                  dispatch({ type: "RESET" }),
                  persistor.purge(),
                  dispatch(setUserIsLoggedIn(false));
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
