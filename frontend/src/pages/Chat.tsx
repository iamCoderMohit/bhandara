import { useEffect } from "react"
import OptionLayout from "../components/OptionLayout"
import { useFollow } from "../hooks/useFollow"
import { useSelector } from "react-redux"
import ChatCard from "../components/ChatCard"

function Chat() {
  const {getFollowingUser} = useFollow()
  useEffect(() => {
    async function fetch() {
      await getFollowingUser()
    }

    fetch()
  }, [])

  const following = useSelector((state: any) => state.friend.followingUsers)

  return (
    <OptionLayout>
      <h1 className="text-white font-semibold text-2xl">Chat</h1>
      <h1 className="text-green-600">Currently you can only send messages to the users you are following, and if you don't see user here after following please refresh the page (site is still under construction)</h1>
        <div className="flex flex-col items-center mt-5">
          {following.map((user: any) => <ChatCard name={user.fullName} userId={user.id} />)}
        </div>
    </OptionLayout>
  )
}

export default Chat