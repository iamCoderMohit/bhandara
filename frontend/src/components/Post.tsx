import { AiFillDislike, AiFillLike } from "react-icons/ai";
import {  FaRegComment } from "react-icons/fa";
import { usePosts } from "../hooks/usePost";
import { useState } from "react";
import { useNavigate } from "react-router";
import UserCard from "./UserCard";

interface postProps {
  imageUrl?: string;
  showBottom: boolean;
  description?: string;
  address?: string;
  username?: string;
  likes: number;
  dislikes: number;
  postId: string;
  userId: string,
  commentCount: number
}

function Post({
  imageUrl,
  showBottom,
  description,
  address,
  username,
  likes,
  dislikes,
  postId,
  userId,
  commentCount
}: postProps) {
  const { likePost, getAllPosts, dislikePost, getOnePost } = usePosts();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();

  async function handleLike() {
    await likePost(postId);
    await getAllPosts();
    setLiked(true);
  }

  async function handleDislike() {
    await dislikePost(postId);
    await getAllPosts();
    setDisliked(true);
  }

  async function handleGetOnePost() {
    await getOnePost(postId);
  }

  if (imageUrl?.length === 0 && !description && !address) {
    return null;
  }
  return (
    <div className={`flex flex-col mx-auto ${showBottom ? "w-[60%]" : "w-40"}`}>
    <UserCard username={username!} userId={userId} />
      <div
        className={`flex justify-center items-center cursor-pointer`}
        onClick={() => (navigate(`/post/${postId}`), handleGetOnePost())}
      >
        {imageUrl && (
          <div>
            <img src={imageUrl} width={500} height={400} alt="" />
          </div>
        )}
      </div>

      <div className="text-white flex gap-5 mt-1">
        <div className="flex gap-2 items-center">
          <button
            className="text-2xl text-green-600 cursor-pointer"
            onClick={handleLike}
            disabled={liked ? true : false}
          >
            <AiFillLike />
          </button>
          <h1>{likes}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="text-2xl cursor-pointer text-red-600"
            onClick={handleDislike}
            disabled={disliked ? true : false}
          >
            <AiFillDislike />
          </button>
          <h1>{dislikes}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-xl">
            <FaRegComment />
          </button>
          <h1>{commentCount ? commentCount : 0}</h1>
        </div>
      </div>

      {/* bottom section is dynamic */}
      {showBottom && (
        <div className="">
          <h1 className="text-white text-lg">{description}</h1>
          <h1 className="text-white">
            <span className="text-blue-700">Address</span> : {address}
          </h1>
        </div>
      )}
      <hr className="text-white" />
    </div>
  );
}

export default Post;
