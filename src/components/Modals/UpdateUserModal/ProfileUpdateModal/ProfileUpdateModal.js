import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";

const ProfileUpdateModal = () => {
  const { user, logUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //! Time Adjustment
  const time = String(new Date().toLocaleTimeString());
  const day = String(new Date());

  //! from .env.local file====>
  const imgHostKey = process.env.REACT_APP_Imgbb_key;
  //   console.log(imgHostKey);

  const handleUpdateUser = (data) => {
    const image = data.img;
    console.log(image);

    //! ==========< Image Hosting >==========

    const formData = new FormData();

    formData.append("image", image[0]);

    console.log(formData);

    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          //   console.log(imgData.data.url)

          const updateProfile = {
            image: imgData.data.url,
          };

          fetch(`http://localhost:5001/update-profile/${user?.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updateProfile),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result) {
                // toast.success(' User profile updated!')

                fetch(
                  `http://localhost:5001/update-authorProfile/${user?.email}`,
                  {
                    method: "PUT",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(updateProfile),
                  }
                )
                  .then((res) => res.json())
                  .then((result) => {
                    if (result) {
                      //! Update Profile Photo
                      const updatePhoto = {
                        category: "profile photo",
                        image: imgData.data.url,
                        description: data.description,
                        authorName: user?.displayName,
                        authorImage: logUser?.image,
                        authorEmail: user?.email,
                        uploadedDay: day,
                        uploadedTime: time,
                      };

                      //! Save Update user photo to the database....
                      fetch("http://localhost:5001/status", {
                        method: "POST",
                        headers: {
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(updatePhoto),
                      })
                        .then((res) => res.json())
                        .then((result) => {
                          if (result) {
                            toast.success(" User profile updated!",{
                              position: "bottom-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                            });
                            window.location.reload(true);
                          }
                        });
                    }
                  });
              }
            });
        }
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="Update-User-Profile"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
          <label
            htmlFor="Update-User-Profile"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={handleSubmit(handleUpdateUser)} className="card-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-white">
                  Update your profile picture
                </span>
              </label>
              <input
                type="text"
                {...register("description", {})}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-white">
                  Update your profile picture
                </span>
              </label>
              <input
                type="file"
                {...register("img", {})}
                required
                className="input input-bordered w-full max-w-xs"
              />
              {errors.img && (
                <p className="text-red-500">{errors.img.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-pink-500 hover:bg-pink-600 border-0 text-white w-full mt-4"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;
