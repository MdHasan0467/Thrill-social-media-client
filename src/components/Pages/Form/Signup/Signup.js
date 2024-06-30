import React, { useContext, useState } from "react";
import {
  BsCheckLg,
  BsEyeFill,
  BsEyeSlashFill,
  BsGithub,
  BsTwitter,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MobileSignUp from "./MobileSignUp/MobileSignUp";
import DesktopSignUp from "./DesktopSignUp/DesktopSignUp";

const Signup = () => {
  //todo: Context APIs Data
  const { createSignUp, googleSignUp, userprofile } = useContext(AuthContext);

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

  // const handleRegister = data => {

  //   const name = data.name;
  //   const email = data.email;
  //   const password = data.password;
  //   const phoneNumber = data.phoneNumber;
  //   const image = data.img;
  //   // console.log(phoneNumber, image)

  //   createSignUp(email, password)
  //     .then(result => {
  //       const user = result.user;

  //     // console.log(image)

  //       //! ==========< Image Hosting >==========

  //       const formData = new FormData()

  //       formData.append('image', image[0])

  //       // console.log(formData)

  //       const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
  //       fetch(url, {
  //         method: 'POST',
  //         body: formData,
  //       })
  //         .then((res) => res.json())
  //         .then((imgData) => {
  //           console.log(imgData);

  //           const photoURL = imgData.data.url

  //           updateUserDetails(name, photoURL);
  //           saveUsers(name, email,  photoURL);

  //           if (imgData.success) {
  //             //   console.log(imgData.data.url)

  //             const addedUser = {
  //               name,
  //               email,
  //               password,
  //               phoneNumber,
  //               image: imgData.data.url
  //             }

  //             //! Save User info to the database....
  //             fetch('http://localhost:5001/users', {
  //               method: 'POST',
  //               headers: {
  //                 'content-type': 'application/json',
  //               },
  //               body: JSON.stringify(addedUser),
  //             })
  //               .then((res) => res.json())
  //               .then((result) => {
  //                 // console.log(result);

  //                 navigate('/login')
  //                 toast.success('Registration successful')
  //               });

  //           }
  //         });

  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // setPasswordError((error.message).slice(22,36));
  //       if (error) {
  //         toast.error((error.message).slice(22, 42));
  //       }
  //     });

  // };

  // const updateUserDetails = (name, photoURL) => {
  //   userprofile(name, photoURL)
  //     .then(() => {
  //       // alert('Profile Updated');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const saveUsers = (name, email,  photoURL) => {
  //   const user = { name, email,  photoURL };
  //   fetch('https://assignment-twelve-server.vercel.app/users', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       navigate('/');
  //       // setCreatedUserEmail(email);
  //     });
  // };

  //! Google Log In....
  const googleSignIn = () => {
    googleSignUp()
      .then((result) => {
        const user = result.user;
        // console.log(result);

        if (result) {
          const addedUser = {
            name: user?.displayName,
            email: user?.email,
            password: "nai",
            phoneNumber: "nai",
            image: user?.photoURL,
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
              // console.log(result);

              navigate("/");
              toast.success("Successfully Login by google!",{
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
      .catch((error) => toast.error("Something is wrong!",{
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }));
  };
  //!......................................

  return (
    <div>
      <div className="w-full mx-auto shadow-2xl md:shadow-none bg-base-100 max-w-md md:max-w-full p-8 space-y-3 rounded-xl">
        <div className="card flex-shrink-0 ">
          <div className="card-body">
            <h3 className="font-serif text-2xl">
              <span className="text-red-500">S</span>
              <span className="text-yellow-500">i</span>
              <span className="text-green-500">g</span>
              <span className="text-blue-500">n</span> Up with email address
            </h3>

            <div className="block md:hidden">
              <MobileSignUp></MobileSignUp>
            </div>

            <div className="hidden md:block">
              <DesktopSignUp></DesktopSignUp>
            </div>

            <p className="text-xs text-center sm:px-6 dark:text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="underline dark:text-gray-100 text-blue-500 mx-2"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={googleSignIn}
            aria-label="Log in with Google"
            className="p-3 rounded-sm"
          >
            <FcGoogle className="text-2xl"></FcGoogle>
          </button>
          <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
            <BsTwitter className="text-2xl text-blue-500"></BsTwitter>
          </button>
          <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
            <BsGithub className="text-2xl"></BsGithub>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
