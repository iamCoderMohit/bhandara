import { useState } from "react";
import OptionLayout from "./OptionLayout";
import EditDetails from "./EditDetails";
import Overlay from "./Overlay";

function Profile() {
  const [edit, setEdit] = useState(true);
  return (
    <div>
        {edit && <Overlay><EditDetails setEdit={setEdit} /></Overlay>}
      <OptionLayout>
        <div>
          <div className="flex justify-between">
            <h1 className="text-white font-bold text-2xl">Profile</h1>
            <button className="bg-blue-700 cursor-pointer rounded-md px-4 text-white"
            onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </div>
        </div>
      </OptionLayout>
          
    </div>
  );
}

export default Profile;
