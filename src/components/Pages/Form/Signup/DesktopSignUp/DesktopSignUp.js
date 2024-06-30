import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthProvider";

const DesktopSignUp = () => {
  //todo: Context APIs Data
  const { createSignUp, userprofile } = useContext(AuthContext);

  //todo: Password show and hide
  const [changePassword, setChangePassword] = useState(true);
  const changeIcon = changePassword === true ? false : true;

  // const { createUser, loading, logOut} = useContext(AuthContext)

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //! from .env.local file====>
  const imgHostKey = process.env.REACT_APP_Imgbb_key;
  // console.log(imgHostKey);

  const handleRegister = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const phoneNumber = data.phoneNumber;
    const image = data.img;
    // console.log(phoneNumber, image)

    createSignUp(email, password)
      .then((result) => {
        const user = result.user;

        // console.log(image)

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

            const photoURL = imgData.data.url;

            updateUserDetails(name, photoURL);
            saveUsers(name, email, photoURL);

            if (imgData.success) {
              //   console.log(imgData.data.url)

              const addedUser = {
                name,
                email,
                password,
                phoneNumber,
                image: imgData.data.url,
              };

              //! Save User info to the database....
              fetch("http://localhost:5001/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(addedUser),
              })
                .then((res) => res.json())
                .then((result) => {
                  console.log(result);

                  navigate("/login");
                  toast.success("Registration successful");
                });
            }
          });
      })
      .catch((error) => {
        console.error(error);
        // setPasswordError((error.message).slice(22,36));
        if (error) {
          toast.error(error.message.slice(22, 42));
        }
      });
  };

  const updateUserDetails = (name, photoURL) => {
    userprofile(name, photoURL)
      .then(() => {
        // alert('Profile Updated');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveUsers = (name, email, photoURL) => {
    const user = { name, email, photoURL };
    fetch("https://assignment-twelve-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        navigate("/");
        // setCreatedUserEmail(email);
      });
  };

  //! Google Log In....
  // const googleSignIn = () => {

  //   googleSignUp()
  //     .then((result) => {
  //       const user = result.user;
  //       // console.log(result);

  //       if (result) {
  //         const addedUser = {
  //           name: user?.displayName,
  //           email:user?.email,
  //           password: 'nai',
  //           phoneNumber: 'nai',
  //           image: user?.photoURL,
  //         }

  //         //! Save User info to the database....
  //           fetch('http://localhost:5001/users', {
  //             method: 'POST',
  //             headers: {
  //               'content-type': 'application/json',
  //             },
  //             body: JSON.stringify(addedUser),
  //           })
  //             .then((res) => res.json())
  //             .then((result) => {
  //               // console.log(result);

  //               navigate('/');
  //               toast.success('Successfully Login by google!');

  //             });
  //       }

  //     })
  //     .catch((error) => toast.error('Something is wrong!'));
  // };
  //!......................................

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="w-1/2 mx-auto">
      <div className="group-card md:flex">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name :</span>
          </label>
          <input
            type="text"
            {...register("name", {})}
            className="input input-bordered md:w-96"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Email :</span>
          </label>
          <input
            type="email"
            {...register("email", {})}
            className="input input-bordered  md:w-96"
            placeholder="Enter your valid email address"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="group-card md:flex">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="number"
            {...register("phoneNumber", {})}
            className="input input-bordered md:w-96"
            placeholder="Enter your valid number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <div className="form-control mx-2">
            <label className="label">
              <span className="label-text">Password :</span>
            </label>
            <div className="flex">
              <input
                type={changePassword ? "password" : "text"}
                {...register("password", {})}
                className="input input-bordered md:w-96"
                placeholder="Enter a secure password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <span
            className="flex items-center mx-2"
            onClick={() => {
              setChangePassword(changeIcon);
            }}
          >
            {changeIcon ? (
              <div className="flex my-2 cursor-pointer">
                <BsEyeSlashFill className="mt-1 mx-2" />
                <p>hide password</p>
              </div>
            ) : (
              <div className="flex my-2 cursor-pointer">
                <BsEyeFill className="mt-1 mx-2" />
                <p>show password</p>
              </div>
            )}
          </span>
        </div>
      </div>

      <div className="flex">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo :</span>
          </label>
          <input
            type="file"
            {...register("img", {
              required: "Photo is Required",
            })}
            className="input input-bordered md:w-96"
          />
          {errors.img && <p className="text-red-500">{errors.img.message}</p>}
        </div>

        <input
          className="btn mx-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white md:w-96 md:mt-9"
          value="Register"
          type="submit"
        />
      </div>
    </form>
  );
};

export default DesktopSignUp;
