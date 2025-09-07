import { Link } from "react-router";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebaseconfig";
import { setUserIsLoggedIn } from "../features/authSlice";

function Navbar() {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-around px-20 py-4">
      <div>
        <Link to={"/"}>
          <img src={logo} width={200} className="cursor-pointer" alt="logo" />
        </Link>
      </div>
      <div>
        {!isLoggedIn && (
          <Link to={"/signin"}>
            <button className="text-white font-cream font-bold text-xl bg-orange-600 px-5 py-2 rounded-md cursor-pointer">
              Join Bros
            </button>
          </Link>
        )}

        {isLoggedIn && (
          <div className="flex items-center gap-5">
            <Link to={"/feed"}>
            <button className="text-white font-cream font-semibold bg-orange-600 px-5 py-1 rounded-md cursor-pointer">
              Feed
            </button>
          </Link>

          <button className="text-white bg-blue-600 py-1 px-5 rounded-md cursor-pointer"
          onClick={() => {
            auth.signOut(),
            dispatch(setUserIsLoggedIn(false))
          }}
          >Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
