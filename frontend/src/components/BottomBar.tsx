import { FaUserCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { SiBuzzfeed } from "react-icons/si";
import { useNavigate } from "react-router";

function BottomBar() {
    const navigate = useNavigate()
  return (
    <div className="h-15 w-full absolute bottom-0 border border-t-white text-white flex justify-around items-center text-3xl">
      <div className="cursor-pointer"
      onClick={() => navigate('/feed')}
      >
        <SiBuzzfeed />
      </div>
      <div className="cursor-pointer">
        <FaCirclePlus />
      </div>
      <div className="cursor-pointer"
      onClick={() => navigate('/profile')}
      >
        <FaUserCircle />
      </div>
    </div>
  );
}

export default BottomBar;
