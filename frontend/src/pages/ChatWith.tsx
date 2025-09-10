import { useParams } from "react-router";
import OptionLayout from "../components/OptionLayout";
import UserCard from "../components/UserCard";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { useChat } from "../hooks/useChat";
import { useState } from "react";
import { useMessages } from "../hooks/useMsg";

function ChatWith() {
  const { id } = useParams();

  const following = useSelector((state: any) => state.friend.followingUsers);
  const myId = useSelector((state: any) => state.user.userInfo.id);

  const [text, setText] = useState("");

  const user = following.find((user: any) => user.id === id);
  const { sendMessage } = useChat(myId);

  function handleSend() {
    sendMessage(id!, text);
  }

  const [test, setTest] = useState(false)

  const chatId = [myId, id].sort().join("_");
  const messages = useMessages(chatId);

  return (
    <OptionLayout>
      <div className="w-[90%] mx-auto mt-4 h-[80%]">
        {test ? <div className="bg-red-600">this is test div</div> : null }
        <UserCard userId={id!} username={user.username} />
        <div className="w-full h-full relative">
          <div className="flex justify-between items-center w-full gap-3 absolute z-10 bottom-0 ">
            <input
              type="text"
              className="border border-white py-3 w-full pl-3 text-white focus:outline-0 rounded-full"
              onChange={(e) => setText(e.target.value)}
            />
            <div
              className="text-white bg-gray-800 p-3 rounded-full w-fit cursor-pointer text-3xl"
              onClick={() => {
                handleSend;
                setTest(prev => !prev)
              }}
            >
              <IoSend />
            </div>
          </div>

          <div className="text-white flex flex-col gap-2 h-[90%] overflow-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-gray-800 py-1 px-4 rounded-md ${msg.senderId === myId ? "self-end" : "self-start"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </OptionLayout>
  );
}

export default ChatWith;
