import { useState } from "react";
import { FaReply } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useReply } from "../hooks/useReply";
import { useSelector } from "react-redux";

interface CommentProps {
  content: string;
  username: string;
  id: string;
  userId: string;
  postId: string;
}

function Comment({ content, username, id, userId, postId }: CommentProps) {
  const [reply, setReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const currUsername = useSelector(
    (state: any) => state.user.userInfo.username
  );

  const { replies, getAllReplies, postReply } = useReply();

  async function fetchReplies() {
    await getAllReplies(id, postId);
  }

  async function handlePostReply() {
    await postReply({
      replyToUserId: userId,
      commentId: id,
      postId,
      content: replyContent,
      username: currUsername,
    });
    await getAllReplies(id, postId);
    setReplyContent("")
  }

  return (
    <div className="text-white bg-gray-900 rounded-md p-2 relative transition-all duration-300">
      <h1 className="text-blue-600 cursor-pointer">@{username}</h1>
      <h1 className="text-lg">{content}</h1>
      <div
        className="flex items-center gap-1 cursor-pointer absolute top-2 right-2"
        onClick={() => (setReply((prev) => !prev), fetchReplies())}
      >
        {reply ? (
          <div className="text-red-500">
            <MdCancel />
          </div>
        ) : (
          <FaReply />
        )}
        <h1>{reply ? "cancel" : "reply"}</h1>
      </div>

      {reply && (
        <div className="pl-5">
          <div className="flex w-full items-center">
            <input
              type="text"
              className="border-0 border-b-1 border-b-white w-full py-1 text-md focus:outline-0"
              placeholder="Add a reply"
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="text-3xl cursor-pointer" onClick={handlePostReply}>
              <IoIosSend />
            </div>
          </div>

          {replies.length === 0 ? (
            <h1>no replies yet.</h1>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              {replies.map((reply: any) => (
                <div>
                  <h1 className="text-blue-600">
                    @{reply.username ? reply.username : "anonymus"}
                  </h1>
                  <h1>{reply.content}</h1>
                  <hr className="text-gray-700" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Comment;
