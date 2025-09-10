import { useEffect } from "react";
import { useInfo } from "../hooks/useInfo";
import UserCard from "./UserCard";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useFollow } from "../hooks/useFollow";

function UserDetails({ userId }: { userId: string }) {
  const { getUserInfo, userInfo } = useInfo();
  const myId = useSelector((state: any) => state.user.userInfo.id);

  useEffect(() => {
    async function fetch() {
      await getUserInfo(userId);
    }

    fetch();
  }, [useInfo, myId]);

  const { followUser, unfollowUser, followLoading } = useFollow();
  const followed = userInfo?.followers?.includes(myId) ?? false;


  async function handleFollow() {
    await followUser(userId, myId);
    await getUserInfo(userId)
  }

  async function handleunfollow() {
    await unfollowUser(userId, myId);
    await getUserInfo(userId)
  }

  return (
    <div className="flex ml-4 md:w-1/2 mx-auto gap-10">
      <div>
        <UserCard username={userInfo.username} userId={userId} />
        <h1 className="text-white">{userInfo.bio}</h1>
      </div>
      <div className="text-white flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="">
            <h1>Followers</h1>
            <h1>{userInfo.followers?.length ?? 0}</h1>
          </div>
          <div className="">
            <h1>Following</h1>
            <h1>{userInfo.following?.length ?? 0}</h1>
          </div>
        </div>
        <Button
          text={followed ? "Unfollow" : "Follow"}
          loading={followLoading}
          handler={followed ? handleunfollow : handleFollow}
        />
      </div>
    </div>
  );
}

export default UserDetails;
