import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";

const NameUpdateModal = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateUser = (data) => {
    const name = data.name;
    console.log(name);

    const updateName = {
      name,
    };

    fetch(`http://localhost:5001/update-name/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateName),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const updateAuthorName = {
            authorName: name,
          };

          fetch(`http://localhost:5001/update-authorName/${user?.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updateAuthorName),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result) {
                toast.success(" User Name updated!",{
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
  };

  return (
    <div>
      <input type="checkbox" id="Update-User-Name" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
          <label
            htmlFor="Update-User-Name"
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
                type="text"
                {...register("name", {})}
                className="input input-bordered w-full max-w-xs"
                placeholder="Update your name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
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

export default NameUpdateModal;
