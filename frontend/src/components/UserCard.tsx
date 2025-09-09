import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

function UserCard({username, userId}: {username: string, userId: string}) {
    const navigate = useNavigate()
  return (
    <div className="flex items-center gap-3 mb-3"
    onClick={() => navigate(`/user/${userId}`)}
    >
      <div className="text-white text-3xl">
        <FaUserCircle />
      </div>
      <h1 className="text-white cursor-pointer">
        @{username ? username : "anonymus"}
      </h1>
    </div>
  );
}

export default UserCard;
