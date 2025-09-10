import { FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router"

interface ChatProps{
    name: string,
    lastMessage?: string,
    userId: string
}

function ChatCard({name, lastMessage, userId}: ChatProps) {
    const navigate = useNavigate()
  return (
    <div className="w-[90%] h-15 bg-gray-900 rounded-md text-white flex items-center p-2 gap-4 cursor-pointer"
    onClick={() => navigate(`/chat/${userId}`)}
    >
        <div className="text-white text-4xl"><FaUserCircle /></div>
        <div>
            <h1 className="text-blue-700">{name ? name : "anonymus"}</h1>
            <h1>{lastMessage ? lastMessage : "no last msg"}</h1>
        </div>
    </div>
  )
}

export default ChatCard