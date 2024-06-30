import React, { useContext } from "react";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";

const SocialAccounts = () => {
  const { googleSignUp } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //! Google Log In....
  const googleSignIn = () => {
    googleSignUp()
      .then((result) => {
        const user = result.user;
        console.log(result);

        if (result) {
          const addedUser = {
            name: user?.displayName,
            email: user?.email,
            password: "N/A",
            phoneNumber: "N/A",
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
              console.log(result);

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
      <div className="mt-6 space-y-4 card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="divider">Login with social accounts</div>

          <button
            onClick={googleSignIn}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full max-w-sm p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
          >
            <FcGoogle className="text-2xl"></FcGoogle>
            <p>Login with Google</p>
          </button>
          <button
            aria-label="Login with GitHub"
            role="button"
            className="flex items-center justify-center w-full max-w-sm p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
          >
            <BsGithub className="text-2xl"></BsGithub>
            <p>Login with GitHub</p>
          </button>
          <button
            aria-label="Login with Twitter"
            role="button"
            className="flex items-center justify-center w-full max-w-sm p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
          >
            <BsTwitter className="text-2xl text-blue-500"></BsTwitter>
            <p>Login with Twitter</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialAccounts;
