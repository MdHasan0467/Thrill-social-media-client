import React, { useState } from "react";
import { toast } from "react-toastify";
import StatusModal from "../../../Home/PostBox/StatusModal/StatusModal";
import UpdateDescription from "./UpdateDescription/UpdateDescription";

const ProfileOptionModal = ({ getsData }) => {
  const [descriptionUpdated, setDescriptionUpdated] = useState();

  //! Delete post
  const handleDelete = (id) => {
    fetch(`http://localhost:5001/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          toast.success(`delete successfully!!`);
          window.location.reload(true);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="OptionModal" className="modal-toggle" />

      <div className="modal">
        <UpdateDescription
          descriptionUpdated={descriptionUpdated}
        ></UpdateDescription>

        <div className="modal-box bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] border-0">
          <label
            htmlFor="OptionModal"
            className="btn btn-sm btn-error btn-circle absolute right-2 top-2"
          >
            X
          </label>

          <div className="modal-action flex justify-center">
            <label
              htmlFor="OptionModal"
              className="btn bg-green-500 hover:bg-green-600 border-0 text-white"
            >
              <h3>Save</h3>
            </label>

            <label
              onClick={() => handleDelete(getsData?._id)}
              htmlFor="OptionModal"
              className="btn bg-red-500 hover:bg-red-600 border-0 text-white"
            >
              <h3>Delete</h3>
            </label>

            <label
              onClick={() => setDescriptionUpdated(getsData)}
              htmlFor="Update-Description"
              className="btn bg-blue-500 hover:bg-blue-600 border-0 text-white"
            >
              <h3>Update</h3>
            </label>

            <label htmlFor="OptionModal" className="btn">
              <h3>More</h3>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptionModal;
