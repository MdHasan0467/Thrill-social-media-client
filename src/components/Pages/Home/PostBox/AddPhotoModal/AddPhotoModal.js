import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthProvider";
import { BsFillGrid3X3GapFill, BsGeoAltFill, BsGlobe, BsPersonFill } from "react-icons/bs";
import { FaFileImage } from "react-icons/fa";

const AddPhotoModal = () => {
  const { user, loading, logUser } = useContext(AuthContext);
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

  const handleaddedStatus = (data) => {
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

          //! ------2------------
          if (image[1]) {
            const formData = new FormData();

            formData.append("image", image[1]);

            const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
            fetch(url, {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((imgData1) => {
                if (imgData1.success) {
                  //! ------3------------
                  if (image[2]) {
                    const formData = new FormData();

                    formData.append("image", image[2]);

                    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
                    fetch(url, {
                      method: "POST",
                      body: formData,
                    })
                      .then((res) => res.json())
                      .then((imgData2) => {
                        // console.log(imgData2)
                        if (imgData2.success) {
                          const addedStatus = {
                            category: "photos",
                            authorName: user?.displayName,
                            authorImage: logUser?.image,
                            authorEmail: user?.email,
                            description: data.description,
                            image: imgData.data.url,
                            image2: imgData1.data.url,
                            image3: imgData2.data.url,
                            uploadedDay: day,
                            uploadedTime: time,
                          };

                          //! Save addedStatus info to the database....
                          fetch("http://localhost:5001/status", {
                            method: "POST",
                            headers: {
                              "content-type": "application/json",
                            },
                            body: JSON.stringify(addedStatus),
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              if (result) {
                                toast.success("Successfully added 3 photos");
                                window.location.reload(true);
                              }
                            });
                        }
                      });
                  } else {
                    const addedStatus = {
                      category: "photos",
                      authorName: user?.displayName,
                      authorEmail: user?.email,
                      authorImage: logUser?.image,
                      description: data.description,
                      image: imgData.data.url,
                      image2: imgData1.data.url,
                      uploadedDay: day,
                      uploadedTime: time,
                    };

                    //! Save addedStatus info to the database....
                    fetch("http://localhost:5001/status", {
                      method: "POST",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(addedStatus),
                    })
                      .then((res) => res.json())
                      .then((result) => {
                        if (result) {
                          toast.success("Successfully added 2 photos");
                          window.location.reload(true);
                        }
                      });
                  }
                  //!=============<3>===END=====
                }
              });
          } else {
            const addedStatus = {
              category: "photos",
              authorName: user?.displayName,
              authorEmail: user?.email,
              authorImage: logUser?.image,
              description: data.description,
              image: imgData.data.url,
              uploadedDay: day,
              uploadedTime: time,
            };

            //! Save added Status info to the database....
            fetch("http://localhost:5001/status", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(addedStatus),
            })
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                if (result) {
                  toast.success("Successfully added 1 photo");
                  window.location.reload(true);
                }
              });
          }

          //!=============<1>===END=====
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="Add-Photo-Modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative border-0 ">
          {/* head line */}
          <h1 className="bg-transparent mx-10 text-gray-700 py-2 font-bold">
            Create a new post
          </h1>
          {/* cross button */}
          <label
            htmlFor="Add-Photo-Modal"
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
            onSubmit={handleSubmit(handleaddedStatus)}
            className="modal-box shadow-none w-full "
          >
            <div className="flex justify-center">
              <div className="form-control w-full">
                <textarea rows={7}
                  type="text"
                  placeholder="Write something about your post"
                  {...register("description", {
                    // required: 'Description is Required',
                  })}
                  className="input focus:outline-0 w-full font-normal w-full h-20"
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>

            <div className="flex w-full items-center justify-center bg-grey-lighter mt-3 border p-2">
    <label className="w-full flex flex-col items-center py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-800 duration-300 hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select your images</span>
        <input
                  type="file"
                  {...register("img", {
                    required: "Photo is Required",
                  })}
                  className="w-full bg-black rounded-lg text-white hidden"
                  multiple
                />
                {errors.img && (
                  <p className="text-amber-300 mt-2">{errors.img.message}</p>
                )}
    </label>
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

            <button type="submit" className="w-full">
              <label
                htmlFor="Add-Photo-Modal"
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

export default AddPhotoModal;
