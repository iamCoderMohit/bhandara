import { useState } from "react";
import OptionLayout from "../components/OptionLayout";
import EditDetails from "../components/EditDetails";
import Overlay from "../components/Overlay";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { usePosts } from "../hooks/usePost";

function Profile() {
  const [edit, setEdit] = useState(false);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const posts = useSelector((state: any) => state.post.posts);
  const navigate = useNavigate()

  const {getOnePost} = usePosts()

  async function handlePost(postId: string) {
    await getOnePost(postId)
  }
  
  return (
    <div className="">
      {(edit || userInfo.length === 0) && (
        <Overlay>
          <EditDetails setEdit={setEdit} />
        </Overlay>
      )}
      <OptionLayout>
        <div className="flex flex-col">
          <div className="flex-1">
          <div className="flex justify-between">
            <h1 className="text-white font-bold text-2xl">Profile</h1>
            <button
              className="bg-blue-700 cursor-pointer rounded-md px-4 text-white"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </div>

          <div className="text-white flex justify-between px-5 md:px-20  mt-6">
            <div>
              <div className="text-white flex items-center gap-2">
                <div className="md:text-5xl text-3xl">
                  <FaUserCircle />
                </div>
                <h1 className="md:text-lg">@{userInfo.username}</h1>
              </div>
              <div className="w-2/3">
                <h1>{userInfo.fullName}</h1>
                <h1>{userInfo.bio}</h1>
              </div>
            </div>
            <div className="flex gap-10 justify-center">
              <div>
                <h1>Followers</h1>
                <h1 className="text-center">{userInfo.followers?.length ?? 0}</h1>
              </div>
              <div>
                <h1>Following</h1>
                <h1 className="text-center">{userInfo.following?.length ?? 0}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-5">
          <hr className="text-white" />
          <h1 className="text-white font-semibold text-2xl">Posts</h1>

          <div className="grid grid-cols-3 gap-2 place-items-center">
            {posts.map((post: any) => (
              <div className={`md:h-60 md:w-60 w-30 h-30 bg-center bg-cover cursor-pointer`} 
              style={{backgroundImage: `url(${post.media})`}}
              onClick={() => (
                handlePost(post.id),
                navigate(`/post/${post.id}`)
              )}
              ></div>
            ))}
          </div>
        </div>
        </div>
      </OptionLayout>
    </div>
  );
}

export default Profile;
