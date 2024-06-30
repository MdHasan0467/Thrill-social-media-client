import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";

const EmailUpdateModal = () => {
  const { user, logUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateUser = (data) => {
    const email = data.email;
    console.log(email);

    const updateEmail = {
      email,
    };

    fetch(`http://localhost:5001/update-email/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateEmail),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          toast.success(" User Email updated!",{
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          // window.location.reload(true);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="Update-User-Email" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
          <label
            htmlFor="Update-User-Email"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={handleSubmit(handleUpdateUser)} className="card-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="email"
                {...register("email", {})}
                className="input input-bordered w-full max-w-xs"
                placeholder="Update your email address"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
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

export default EmailUpdateModal;
