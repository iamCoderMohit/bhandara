import { useState } from "react";
import LocationPicker from "../components/Map";
import OptionLayout from "../components/OptionLayout";
import Button from "../components/Button";
import { usePosts } from "../hooks/usePost";
import Toast from "../components/Toast";
import { IoIosWarning } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

function Upload() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [toast, setToast] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const {uploadPost, postLoading, postError} = usePosts()

  async function handleClick(){
    await uploadPost(file, location, desc, position)
    setToast(true)
  }

  return (
    <OptionLayout>
      {toast ? <Toast text={postError ? postError : "uploaded"} icon={postError ? <IoIosWarning /> : <FaCheck />} setToast={setToast} status={postError ? false : true} /> : null}
      <h1 className="text-white font-semibold text-lg">
        Tell others what you see nearby
      </h1>
      <div className="text-white p-4 overflow-auto h-140 flex flex-col gap-5">
        {/* address desc loaction file */}

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg">
            Upload proof of bhandara*
          </label>
          <input
            type="file"
            className="border border-white rounded-md py-1 px-3"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg">
            Description*
          </label>
          <input
            type="text"
            className="border border-white rounded-md py-1 pl-2"
            placeholder="9:00 am, Hanuman Mandir"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="" className="text-lg">
            Select location by searching here:{" "}
          </label>
          <LocationPicker onPositionChange={setPosition} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg">
            Exact Location*
          </label>
          <input
            type="text"
            className="border border-white rounded-md  py-1 pl-2"
            placeholder="petrol pump k pass"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Button text="Upload Post" handler={handleClick} loading={postLoading} />
      </div>
    </OptionLayout>
  );
}

export default Upload;
