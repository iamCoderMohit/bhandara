import { useState } from "react";
import OptionLayout from "../components/OptionLayout";
import EditDetails from "../components/EditDetails";
import Overlay from "../components/Overlay";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import Post from "../components/Post";

function Profile() {
  const [edit, setEdit] = useState(false);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const posts = useSelector((state: any) => state.post.posts);
  
  return (
    <div>
      {edit || userInfo.length === 0 && (
        <Overlay>
          <EditDetails setEdit={setEdit} />
        </Overlay>
      )}
      <OptionLayout>
        <div>
          <div className="flex justify-between">
            <h1 className="text-white font-bold text-2xl">Profile</h1>
            <button
              className="bg-blue-700 cursor-pointer rounded-md px-4 text-white"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </div>

          <div className="text-white flex justify-between px-20  mt-6">
            <div>
              <div className="text-white flex items-center gap-2">
                <div className="text-5xl">
                  <FaUserCircle />
                </div>
                <h1 className="text-lg">@{userInfo.username}</h1>
              </div>
              <div className="w-2/3">
                <h1>{userInfo.fullName}</h1>
                <h1>{userInfo.bio}</h1>
              </div>
            </div>
            <div className="flex gap-10 justify-center">
              <div>
                <h1>Followers</h1>
                <h1 className="text-center">{userInfo.followers}</h1>
              </div>
              <div>
                <h1>Following</h1>
                <h1 className="text-center">{userInfo.following}</h1>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr className="text-white" />
          <h1 className="text-white font-semibold text-2xl">Posts</h1>

          <div>
            {posts.map((post: any) => (
              <Post key={post.id} imageUrl={post.media} showBottom={false} />
            ))}
          </div>
        </div>
      </OptionLayout>
    </div>
  );
}

export default Profile;
