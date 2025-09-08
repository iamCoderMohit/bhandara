import { MdCancel } from "react-icons/md";
import Button from "./Button";
import React, { useState } from "react";
import { useEdit } from "../hooks/useEdit";
import Toast from "./Toast";
import { IoIosWarning } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { usePosts } from "../hooks/usePost";

function EditDetails({setEdit}: {setEdit: React.Dispatch<boolean>}) {
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [bio, setBio] = useState("")
    const [toast, setToast] = useState(false)

    const {editDetails, loading, error} = useEdit()
    const {getUserPosts, postLoading, postError} = usePosts()

    async function handleEdit() {
        await editDetails(username, fullname, bio)
        await getUserPosts()
        setEdit(false)
        setToast(true)
    }

  return (
    <div className="w-[30%] h-fit absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  bg-gray-800 z-10 rounded-md p-5">
        {toast ? <Toast text={error || postError ? error || postError! : "successfully edited details"} icon={error || postError ? <IoIosWarning /> : <FaCheck />} setToast={setToast} status={error ? false : true} /> : null}
      <div className="text-white cursor-pointer absolute right-5 top-5 text-2xl"
      onClick={() => setEdit(false)}
      >
        <MdCancel />
      </div>
      <h1 className="text-white text-xl text-center mt-5">Edit details</h1>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col text-white">
        <label htmlFor="" className="">Username*</label>
        <input type="text" className="border border-white rounded-md pl-2 py-1" placeholder="choose a unique username" 
        onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="" className="">Full name*</label>
        <input type="text" className="border border-white rounded-md pl-2 py-1" placeholder="what's your name" 
        onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className="flex flex-col text-white">
        <label htmlFor="" className="">Bio*</label>
        <input type="text" className="border border-white rounded-md pl-2 py-1" placeholder="foodie" 
        onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <Button text="Save details" handler={handleEdit} loading={loading || postLoading} />    
      </div>
    </div>
  );
}

export default EditDetails;
