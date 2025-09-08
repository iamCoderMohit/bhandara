import { useEffect } from "react";
import OptionLayout from "../components/OptionLayout";
import { usePosts } from "../hooks/usePost";
import { useSelector } from "react-redux";
import Post from "../components/Post";

function Feed() {
  const {getAllPosts} = usePosts()

  useEffect(() => {
    async function fetch(){
      await getAllPosts()
    }

    fetch()
  }, [])

  const posts = useSelector((state: any) => state.post.allPosts)
  return (
    <OptionLayout>
      <div>
        <h1 className="text-white font-bold text-2xl">Feed</h1>
      </div>

      <div className="flex flex-col gap-5 overflow-auto w-full h-140">
        {posts.map((post: any) => <Post showBottom={true} imageUrl={post.media} />)}
      </div>
    </OptionLayout>
  )
}

export default Feed