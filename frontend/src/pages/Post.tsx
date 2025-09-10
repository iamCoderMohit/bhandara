import { useSelector } from "react-redux";
import OptionLayout from "../components/OptionLayout";
import { useComment } from "../hooks/useComment";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router";
import Comment from "../components/Comment";

function Post() {
  const post = useSelector((state: any) => state.post.onePost);
  const allComments = useSelector((state: any) => state.comment.postComments);
  const { getAllComments, loading, commentError, postComment } = useComment();
  const {id} = useParams()

  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetch() {
      await getAllComments(id!);
    }

    fetch();
  }, []);

  async function handlePost() {
    await postComment(content, post.id);
    await getAllComments(id!);
  }
  return (
    <OptionLayout>
      <div className="text-white flex flex-col mx-auto w-[60%] h-[calc(100vh-170px)] mt-10">
        <img src={post.media} width={500} alt="" className="object-contain" />

        <div className="mt-3 flex-1 overflow-y-auto">
          <h1 className="text-lg">Comments</h1>

          <div className="flex w-full items-center">
            <input
              type="text"
              className="border-0 border-b-1 border-b-white w-full py-2 text-xl focus:outline-0"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a comment"
            />
            <div className="text-3xl cursor-pointer" onClick={handlePost}>
              <IoIosSend />
            </div>
          </div>

          <div className="">
            {allComments.length === 0 && <h1>No comments yet. Post one?</h1>}

            {loading ? "loading" : <div className="flex flex-col gap-3 overflow-auto mt-3">
              {allComments.map((comment: any) => <Comment username={comment.username ? comment.username : "anonymus"} content={comment.content} id={comment.id} userId={comment.userId} postId={id!} /> )}
            </div> }
          </div>
        </div>
      </div>
    </OptionLayout>
  );
}

export default Post;
