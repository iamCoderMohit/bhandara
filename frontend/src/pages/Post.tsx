import { useSelector } from "react-redux";
import OptionLayout from "../components/OptionLayout";
import { useComment } from "../hooks/useComment";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function Post() {
  const post = useSelector((state: any) => state.post.onePost);
  const allComments = useSelector((state: any) => state.comment.postComments);
  const { getAllComments, loading, commentError, postComment } = useComment();

  const [content, setContent] = useState("");

  console.log(allComments);
  useEffect(() => {
    async function fetch() {
      await getAllComments(post.id);
    }

    fetch();
  }, []);

  async function handlePost() {
    await postComment(content, post.id);
  }
  return (
    <OptionLayout>
      <div className="text-white flex flex-col mx-auto w-[60%]">
        <img src={post.media} width={500} alt="" />

        <div className="mt-3">
          <h1 className="text-lg">Comments</h1>

          <div className="flex w-full items-center ">
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

          <div>
            {allComments.length === 0 && <h1>No comments yet. Post one?</h1>}
          </div>
        </div>
      </div>
    </OptionLayout>
  );
}

export default Post;
