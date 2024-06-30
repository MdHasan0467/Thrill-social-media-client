import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

const IntroUpdateModal = () => {
  const { user, logUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateCoverPhoto = (data) => {
    const intro = data.intro;
    // console.log(intro)

    const updateCoverPhoto = {
      updaterName: user?.displayName,
      updaterImage: logUser?.image,
      updaterEmail: user?.email,
      intro,
    };

    fetch(`http://localhost:5001/update-intro/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateCoverPhoto),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          toast.success(" Intro updated!",{
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
  };

  // if (errors) {
  //     toast.error(errors?.message,{
		// 	position: "bottom-center",
		// 	autoClose: 2000,
		// 	hideProgressBar: false,
		// 	closeOnClick: true,
		// 	pauseOnHover: true,
		// 	draggable: true,
		// 	progress: undefined,
		// 	theme: "dark",
		// })
  // }

  return (
    <div>
      <input type="checkbox" id="Update-Intro-Modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
          <label
            htmlFor="Update-Intro-Modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form
            onSubmit={handleSubmit(handleUpdateCoverPhoto)}
            className="card-body"
          >
            <div className="form-control w-full max-w-xs">
              <label className="label"></label>
              <input
                type="text"
                {...register("intro", {
                  required: "Intro is Required",
                })}
                className="input textarea w-full max-w-xs"
                placeholder="Update your intro"
              />
              {errors.intro && (
                <p className="text-red-500">{errors.intro.message}</p>
              )}
            </div>

            <button type="submit" className="w-full">
              <label
                htmlFor="Update-Intro-Modal"
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

export default IntroUpdateModal;
