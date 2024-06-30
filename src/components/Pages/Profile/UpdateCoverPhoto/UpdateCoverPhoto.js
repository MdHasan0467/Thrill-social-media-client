import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";

const UpdateCoverPhoto = () => {
  const { user, logUser } = useContext(AuthContext);

  // console.log(logUser)

  //! Time Adjustment
  const time = String(new Date().toLocaleTimeString());
  const day = String(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //! from .env.local file====>
  const imgHostKey = process.env.REACT_APP_Imgbb_key;
  //   console.log(imgHostKey);

  const handleUpdateCoverPhoto = (data) => {
    const image = data.img;
    console.log(image);

    //! ==========< Cover Photo Hosting >==========

    const formData = new FormData();

    formData.append("image", image[0]);

    // console.log(formData)

    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          console.log(imgData.data.url);

          // For Update in user collection
          const updateCoverPhoto = {
            updaterName: user?.displayName,
            updaterImage: logUser?.image,
            updaterEmail: user?.email,
            coverPhoto: imgData.data.url,
            uploadedDay: day,
            uploadedTime: time,
          };

          // For Post as a status in added collection
          const postCoverPhoto = {
            category: "cover photo",
            authorName: user?.displayName,
            authorImage: logUser?.image,
            authorEmail: user?.email,
            image: imgData.data.url,
            uploadedDay: day,
            uploadedTime: time,
          };

          //! Update cover photo for user collection
          fetch(`http://localhost:5001/update-cover-photo/${user?.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updateCoverPhoto),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result) {
                //! Post for added collection
                fetch("http://localhost:5001/status", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(postCoverPhoto),
                })
                  .then((res) => res.json())
                  .then((result) => {
                    if (result.acknowledged) {
                      toast.success(" Cover Photo updated!");
                      window.location.reload(true);
                    }
                  });
              }
            });
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="Update-Cover-Photo" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
          <label
            htmlFor="Update-Cover-Photo"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form
            onSubmit={handleSubmit(handleUpdateCoverPhoto)}
            className="card-body"
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-white">Photo</span>
              </label>
              <input
                type="file"
                {...register("img", {
                  required: "Photo is Required",
                })}
                className=" w-full max-w-xs"
              />
              {errors.img && (
                <p className="text-red-500">{errors.img.message}</p>
              )}
            </div>

            <button type="submit" className="w-full">
              <label
                htmlFor="Update-Cover-Photo"
                className="btn bg-pink-500 hover:bg-pink-600 border-0 text-white w-full mt-4"
              >
                Update
              </label>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoverPhoto;
