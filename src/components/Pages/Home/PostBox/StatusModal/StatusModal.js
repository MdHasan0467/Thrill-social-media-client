import React, { useContext } from "react";
// import { BsCheckLg } from 'react-icons/bs';
// import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthProvider";
import { BsFillEmojiSmileFill, BsFillGrid3X3GapFill, BsGeoAltFill, BsGlobe, BsPersonFill } from "react-icons/bs";
import { FaFileImage } from "react-icons/fa";

const StatusModal = () => {
  const { user, logUser } = useContext(AuthContext);
  console.log(logUser)

  //! Time Adjustment
  const time = String(new Date().toLocaleTimeString());
  const day = String(new Date());

  const handleStatus = (e) => {
    e.preventDefault();

    const status = {
      category: "status",
      authorName: user?.displayName,
      authorImage: logUser?.image,
      authorEmail: user?.email,
      description: e.target.text.value,
      uploadedDay: day,
      uploadedTime: time,
    };

    //! Save addedStatus info to the database....
    fetch("http://localhost:5001/status", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result.acknowledged) {
          e.target.reset();
          toast.success("Successfully posted your status");
          window.location.reload(true);
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="Status-Modal" className="modal-toggle" />

      <div className="modal ">
        <div className="modal-box relative border-0 ">
          {/* head line */}
          <h1 className="bg-transparent mx-10 text-gray-700 py-2 font-bold">
            Create a new status
          </h1>
          {/* cross button */}
          <label
            htmlFor="Status-Modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <div className="grid grid-cols-2">
            <div className="flex">
              <img src={logUser?.image} className="w-12 h-12 rounded-full" />
            <div className="mx-2">
            <p className="text-start font-bold">
              {logUser?.name}
            </p>
            <p className="text-start flex space-x-3 border rounded-lg font-bold">
            <BsGlobe className="mt-1 ml-2 text-blue-700" />
              <span>
              public
              </span>
            </p>
            </div>
            </div>
            <div></div>
          </div>

          <form
            onSubmit={handleStatus}
            className="modal-box shadow-none w-full  "
          >
            <div className="flex justify-center">
              <div className="form-control w-full">
                <textarea id="status" rows="7"
                  type="text"
                  name="text"
                  placeholder={`What's on your mind,  ${logUser?.name}?`}
                  className="input focus:outline-0 w-full font-normal h-20"
                  required
                />
                <div className="grid grid-cols-2 gap-5 mt-3">
                  <div></div>
                  <p className="flex justify-end">
                  <BsFillEmojiSmileFill className="cursor-pointer hover:text-blue-800 text-yellow-300 text-2xl" title="emoji" />
                  </p>
                </div>
              <div className="grid grid-cols-2 gap-5 border border-1 my-5 py-3 px-3 rounded-lg">
                <div>
                  <h1>add to your post</h1>
                </div>
                <div className="flex justify-center space-x-5">
              <FaFileImage className="cursor-pointer text-green-700 hover:text-blue-800 text-2xl" title="upload photo" />
              <BsPersonFill className="cursor-pointer text-gray-700 hover:text-blue-800 text-2xl" title="tag friends" />
              <BsGeoAltFill className="cursor-pointer text-red-500 hover:text-blue-800 text-2xl" title="location" />
              <BsFillGrid3X3GapFill className="cursor-pointer text-orange-300 hover:text-blue-800 text-2xl" title="more" />
            </div>
              </div>
              </div>
            </div>

            <button type="submit" className="w-full">
              <label
                htmlFor="Status-Modal"
                className="modal-action flex justify-center btn bg-blue-600 hover:bg-blue-700 border-0 border text-white w-full mt-4"
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

export default StatusModal;
