import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
// import { BsCheckLg } from 'react-icons/bs';

const AdCenter = () => {
  const { logUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const imgHostKey = process.env.REACT_APP_Imgbb_key;
  // console.log(imgbbKey)

  const handleRegister = (data) => {
    const image = data.img;
    // console.log(phoneNumber, image)

    //! ==========< Image Hosting >==========

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
          //   console.log(imgData.data.url)

          const addedAdvertise = {
            authorName: logUser?.name,
            authorEmail: logUser?.email,
            src: imgData.data.url,
          };

          //!  User info to the database....
          fetch("http://localhost:5001/ad-center", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addedAdvertise),
          })
            .then((res) => res.json())
            .then((result) => {
              // console.log(result);

              //   navigate('/login')
              toast.success("Successfully added your Advertise",{
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            });
        }
      })

      .catch((error) => {
        console.error(error);
        // setPasswordError((error.message).slice(22,36));
        if (error) {
          toast.error(error.message.slice(22, 42),{
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };

  return (
    <div className="my-20">
      <h1 className="my-10 text-2xl font-semibold">Ad Center</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="">
          <input
            type="file"
            {...register("img", {
              required: "Photo is Required",
            })}
            className=""
          />
          {errors.img && <p className="text-red-500">{errors.img.message}</p>}
        </div>
        <input
          className="btn max-w-xs bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white w-full mt-4"
          value="Submit"
          type="submit"
        />
      </form>

      <div className="graph-chart m-10">
        <div className="pieContainer animate-bounce">
          <div className="pieBackground"></div>
          <div id="pieSlice1" className="hold">
            <div className="pie text-white"></div>
          </div>
          <div id="pieSlice2" className="hold">
            <div className="pie"></div>
          </div>
          <div id="pieSlice3" className="hold">
            <div className="pie"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCenter;
