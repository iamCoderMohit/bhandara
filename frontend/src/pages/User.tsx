import { useParams } from "react-router";
import OptionLayout from "../components/OptionLayout";
import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";

function User() {
    const {id} = useParams()
  return (
    <OptionLayout>
        <div>
            <UserDetails userId={id!} />
            <UserPosts userId={id!} />
        </div>
    </OptionLayout>
  )
}

export default User