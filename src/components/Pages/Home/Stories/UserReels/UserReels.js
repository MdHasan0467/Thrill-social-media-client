import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthProvider";

const UserReels = () => {
  const { user, logUser } = useContext(AuthContext);
  // console.log('logUser',logUser);

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
  // console.log(imgHostKey);

  const handleAddedReel = (data) => {
    const image = data.img;

    // console.log(image);

    //! --------1----------

    const formData = new FormData();

    formData.append("image", image[0]);

    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        // console.log(imgData);
        if (imgData.success) {
          // console.log(imgData.data.url)

          const addedReels = {
            category: "reels",
            authorName: user?.displayName,
            authorEmail: user?.email,
            authorImage: logUser?.image,
            image: imgData.data.url,
            uploadedDay: day,
            uploadedTime: time,
          };

          //! Save added Reels info to the database....
          fetch("http://localhost:5001/reels", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addedReels),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result) {
                toast.success("Successfully added Reels");
                window.location.reload(true);
              }
            });
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="Reels-Post-Modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 ">
          <h1 className=" bg-transparent mx-7 text-white py-2 rounded-t-lg text-2xl">
            Reel Update
          </h1>
          <label
            htmlFor="Reels-Post-Modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form
            onSubmit={handleSubmit(handleAddedReel)}
            className="modal-box w-full mx-auto shadow-none bg-transparent "
          >
            <div className="flex justify-center">
              <div className="form-control group w-full max-w-xs">
                <label className="label">
                  <h3 className="label-text">Choose from Album</h3>
                </label>
                <input
                  type="file"
                  {...register("img", {
                    required: "Photo is Required",
                  })}
                  className="w-full max-w-xs"
                  multiple
                />
                {errors.img && (
                  <p className="text-red-500">{errors.img.message}</p>
                )}
              </div>
            </div>

            <button type="submit" className="w-full">
              <label
                htmlFor="Reels-Post-Modal"
                className="modal-action flex justify-center btn bg-indigo-600 hover:bg-indigo-700 border-0 text-white w-full mt-4"
              >
                Post
              </label>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserReels;
