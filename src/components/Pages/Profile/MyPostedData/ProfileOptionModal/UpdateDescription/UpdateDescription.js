import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../../context/AuthProvider";

const UpdateDescription = ({ descriptionUpdated }) => {
  const { user, logUser } = useContext(AuthContext);
  console.log(descriptionUpdated);

  const handleUpdateDescription = (e) => {
    e.preventDefault();
    const description = e.target.description.value;

    const updateDescription = {
      updaterName: user?.displayName,
      updaterImage: logUser?.image,
      updaterEmail: user?.email,
      description,
    };

    console.log(description);

    fetch(`http://localhost:5001/description/${descriptionUpdated?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateDescription),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          toast.success("Successfully updated!");
          window.location.reload(true);
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="Update-Description" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] border-0">
          <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] border-0 mx-10 rounded-t-lg text-white py-2">
            Update Your Description
          </h1>

          <label
            htmlFor="Update-Description"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form
            onSubmit={handleUpdateDescription}
            className="modal-box shadow-none bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 rounded-t-none border-0 "
          >
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs">
                <input
                  type="text"
                  name="description"
                  placeholder="Write new description"
                  className="input input-bordered w-full max-w-xs h-20"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full">
              <label
                htmlFor="Update-Description"
                className="modal-action flex justify-center btn bg-indigo-600 hover:bg-indigo-700 border-0 text-white h-full"
              >
                Update
              </label>
            </button>
          </form>

          {descriptionUpdated?.image3 ? (
            <div className="flex justify-between mt-10">
              <img
                className="w-16 h-16"
                src={descriptionUpdated?.image}
                alt="image1"
              />
              <img
                className="w-16 h-16"
                src={descriptionUpdated?.image2}
                alt="image2"
              />
              <img
                className="w-16 h-16"
                src={descriptionUpdated?.image3}
                alt="image3"
              />
            </div>
          ) : (
            <>
              {descriptionUpdated?.image2 ? (
                <div className="flex justify-evenly mt-10">
                  <img
                    className="w-16 h-16"
                    src={descriptionUpdated?.image}
                    alt="image1"
                  />
                  <img
                    className="w-16 h-16"
                    src={descriptionUpdated?.image2}
                    alt="image2"
                  />
                </div>
              ) : (
                <div className="flex justify-center mt-10">
                  <img
                    className="w-16 h-16"
                    src={descriptionUpdated?.image}
                    alt="image1"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateDescription;
