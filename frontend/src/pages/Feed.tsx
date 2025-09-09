import { useEffect } from "react";
import OptionLayout from "../components/OptionLayout";
import { usePosts } from "../hooks/usePost";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { Link } from "react-router";

function Feed() {
  const {getAllPosts} = usePosts()

  useEffect(() => {
    async function fetch(){
      await getAllPosts()
    }

    fetch()
  }, [])

  const posts = useSelector((state: any) => state.post.allPosts)
  const userInfo = useSelector((state: any) => state.user.userInfo)

  return (
    <OptionLayout>
      {userInfo.length === 0 ? <div className="bg-green-500 rounded-md mx-10 h-fit p-5 flex flex-col">
        <h1 className="text-white text-center mb-4">Before getting started edit your details</h1>
        <Link className="bg-blue-700 py-2 px-5 rounded-md cursor-pointer mx-auto" to={'/profile'}>Edit</Link>
      </div> :  <div>
        <div>
        <h1 className="text-white font-bold text-2xl">Feed</h1>
      </div>

      <div className="flex flex-col gap-10 overflow-auto w-full h-140">
        {posts.map((post: any) => <Post showBottom={true} imageUrl={post.media} description={post.description} address={post.address} username={post.username} likes={post.likeCount} dislikes={post.dislikeCount} postId={post.id}/>)}
      </div>
      </div> }
    </OptionLayout>
  )
}

export default Feed