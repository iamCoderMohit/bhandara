import { useEffect } from "react"
import { usePosts } from "../hooks/usePost"
import { useNavigate } from "react-router"

function UserPosts({userId}: {userId: string}) {
    const {getNewUserPost, newUserPosts, postLoading, getOnePost} = usePosts()
    useEffect(() => {
        async function fetch(){
            await getNewUserPost(userId)
        }
        fetch()
    }, [])

    const navigate = useNavigate()

      async function handlePost(postId: string) {
    await getOnePost(postId)
  }
  
  return (
          <div className="grid grid-cols-3 gap-2 place-items-center mt-5">
            {newUserPosts.map((post: any) => (
              <div className={`h-60 w-60 bg-center bg-cover cursor-pointer`} 
              style={{backgroundImage: `url(${post.media})`}}
              onClick={() => (
                handlePost(post.id),
                navigate(`/post/${post.id}`)
              )}
              ></div>
            ))}
          </div>
  )
}

export default UserPosts