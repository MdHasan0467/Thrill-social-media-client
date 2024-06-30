import React, { useContext } from "react";
import { BsEmojiSmile, BsFillCameraFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import ImageUpload from "../../../EXT/ImageUpload/ImageUpload";
import FeelingStatus from "../FeelingStatus/FeelingStatus";
import AddPhotoModal from "./AddPhotoModal/AddPhotoModal";
import StatusModal from "./StatusModal/StatusModal";
import { toast } from "react-toastify";

const PostBox = () => {
  const { user, logUser } = useContext(AuthContext);

  const handleLoginError = () => {
    toast.error("login first!",{
			position: "bottom-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
  };

  // const navigate = useNavigate()

  // const handlePost = e => {
  //   e.preventDefault();
  //   const text = e.target.text.value;
  //   const status = {
  //     description: text
  //   }
  //   console.log(text)

  //   					//! Save addedStatus info to the database....
  //             fetch('http://localhost:5001/status', {
  //               method: 'POST',
  //               headers: {
  //                 'content-type': 'application/json',
  //               },
  //               body: JSON.stringify(status),
  //             })
  //               .then((res) => res.json())
  //               .then((result) => {
  //                 console.log(result.acknowledged);
  //                 if (result.acknowledged) {
  //                   navigate('/home')
  //                   e.target.reset()
  //                   console.log('done!')
  //                 toast.success('Successfully posted!!');
  //                 }
  //               });
  // }



  const handleLiveVideo = () => {
    toast.error('This feature is comming soon...',{
			position: "bottom-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		})
  }
  return (
    <div>
      <div className="card rounded-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col w-full">
            <div className="flex">
              {logUser?.image ? (
                <Link
                  title="Profile"
                  to="/profile"
                  className="avatar cursor-pointer online mx-5"
                >
                  <div className="w-16 h-16 rounded-full hover:ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={logUser?.image} />
                  </div>
                </Link>
              ) : (
                <img
                  className="w-16 h-16 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkA7r1pd3h80Lq9uOByb2ALq5FoOAe-Mq0j3_EZzmOo4tXO0CUkRHQrbXMruyClSGA87E&usqp=CAU"
                  alt=""
                />
              )}
              {logUser ? (
                <label
                  title="Share What's on your mind "
                  htmlFor="Status-Modal"
                  className="flex photo hover:cursor-pointer"
                >
                  <p className="flex items-center mx-1 border border-black md:pr-32 pr-10 pl-2 rounded-3xl">
                    What's on your mind ?
                  </p>
                </label>
              ) : (
                <label
                  title="Share What's on your mind"
                  onClick={handleLoginError}
                  className="flex photo hover:cursor-pointer"
                >
                  <p className="flex items-center mx-1 border border-black md:pr-32 pr-10 pl-2 rounded-3xl">
                    What's on your mind ?
                  </p>
                </label>
              )}
            </div>
            <div className="divider"></div>
            {/* Post Live Video *** Photos/Videos *** Feelings/Activity  */}
            <div className="md:flex hidden">
              {/* Live Vide */}
              <p
              onClick={handleLiveVideo}
                title="coming soon..."
                className="flex vdo  hover:cursor-pointer"
              >
                <div className="flex items-center mx-1 ">
                  <FaVideo className="text-red-600"></FaVideo>
                </div>
                <p className="md:flex items-center mx-1 hidden">Live Video</p>
              </p>

                 {/* Photos/Videos */}
                 {logUser ? (
                <label
                title="Share your picture"
                htmlFor="Add-Photo-Modal"
                className="flex photo mx-5 hover:cursor-pointer"
              >
                <div className="flex items-center mx-1">
                  <BsFillCameraFill className="text-green-600"></BsFillCameraFill>
                </div>
                <p className="md:flex hidden items-center mx-1">
                  Photos/Videos
                </p>
              </label>
              ) : (
                <label
                onClick={handleLoginError}
                title="Share your picture"
                htmlFor="Add-Photo-Modal"
                className="flex photo mx-5 hover:cursor-pointer"
              >
                <div className="flex items-center mx-1">
                  <BsFillCameraFill className="text-green-600"></BsFillCameraFill>
                </div>
                <p className="md:flex hidden items-center mx-1">
                  Photos/Videos
                </p>
              </label>
              )}
              



              

              {/* Feelings/Activity */}

              {logUser ? (
                <label
                title="Share your feelings"
                htmlFor="FeelingStatus"
                className="flex emoji hover:cursor-pointer "
              >
                <div className="flex items-center mx-1">
                  <BsEmojiSmile className="text-orange-600"></BsEmojiSmile>
                </div>
                <p className="md:flex hidden">Feelings/Activity</p>
              </label>
              ) : (
                <label
                onClick={handleLoginError}
                title="Share your feelings"
                htmlFor="FeelingStatus"
                className="flex emoji hover:cursor-pointer "
              >
                <div className="flex items-center mx-1">
                  <BsEmojiSmile className="text-orange-600"></BsEmojiSmile>
                </div>
                <p className="md:flex hidden">Feelings/Activity</p>
              </label>
              )}
              
            </div>

            <div className="md:hidden flex">
              <Link
                title="coming soon..."
                className="flex vdo  hover:cursor-pointer"
              >
                <div className="flex items-center mx-1 ">
                  <FaVideo className="text-red-600"></FaVideo>
                </div>
                <p className="flex md:hidden items-center mx-1">Live</p>
              </Link>

              <label
                title="Share your picture"
                htmlFor="Add-Photo-Modal"
                className="flex photo mx-5 hover:cursor-pointer"
              >
                <div className="flex items-center mx-1">
                  <BsFillCameraFill className="text-green-600"></BsFillCameraFill>
                </div>
                <p className="flex md:hidden items-center mx-1">Photos</p>
              </label>

              <label
                title="Share your feelings"
                htmlFor="FeelingStatus"
                className="flex emoji hover:cursor-pointer "
              >
                <div className="flex items-center mx-1">
                  <BsEmojiSmile className="text-orange-600"></BsEmojiSmile>
                </div>
                <p className="flex md:hidden">Feelings/Activity</p>
              </label>
            </div>

            {/*  <ImageUpload /> */}
            {logUser && (
              <>
                <AddPhotoModal />
                <StatusModal />
                <FeelingStatus />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
