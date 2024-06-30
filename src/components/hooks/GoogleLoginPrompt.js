import react, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";

const GoogleLoginPrompt = () => {
  const { user, googleSignUp } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider();

  //* Google Login Form
  const handleGoogle = () => {
    googleSignUp(googleProvider)
      .then((result) => {
        const user = result.user;
        // console.log(user);

        const addedUser = {
          name: user?.displayName,
          email: user?.email,
          phone: 0,
          role: "User",
          image: user?.photoURL,
        };
        // console.log(addedUser);

        //! Save User info to the database....
        fetch("http://localhost:5001/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(addedUser),
        })
          .then((res) => res.json())
          .then((result) => {
            // console.log(result.data);
            if (result) {
              // console.log(result);
              toast.success("Google Login successful", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              //   navigate(from, { replace: true });
              //   navigate(`${from}`);
            }
          });
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Failed to login", {
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
  };

  return (
    <>
      {!user?.uid && (
        <div
          onClick={handleGoogle}
          className={`w-80 fixed lg:ml-[40vw] ml-[10vw] top-32 mx-auto z-30 transition-opacity`}
        >
          <div className="w-80 h-12 rounded-md cursor-pointer bg-white hover:bg-green-50 dark:text-gray-900 border p-0 m-0 transition duration-700 ease-in-out hover:scale-95">
            <button aria-label="Log in with Google" className=" flex mt-3">
              <FcGoogle className="mt-1 mx-3" />
              <span>Sign in to Thrill with Google</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleLoginPrompt;
