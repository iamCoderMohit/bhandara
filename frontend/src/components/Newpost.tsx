import axios from "axios";
import { useState } from "react";
import { auth } from "../config/firebaseconfig";

function Newpost() {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit() {
    try {
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("address", address);
      formData.append("description", description);
      formData.append("location", location);
      const res = await axios.post(
        "http://localhost:3000/api/v1/post/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        }
      );
    } catch (error) {
      console.error("some error occured");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  return (
    <div>
      <input
        type="file"
        accept="image/*, video/*"
        onChange={handleFileChange}
      />
      //address desc location media
      <input
        type="text"
        placeholder="add"
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="desc"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="loacation"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Newpost;
