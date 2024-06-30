import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { BsFillPersonPlusFill, BsLinkedin } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import AutoSlider from "../../Shared/AutoSlider/AutoSlider";

const Friends = () => {
  const { logUser } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data: getData,
    refetch,
  } = useQuery({
    queryKey: ["getData"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/contact-friend/${logUser?.email}`
        );
        const data = await res.json();
        if (data === undefined) {
          return "Loading...";
        } else {
          return data.reverse();
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (getData === undefined) return "Loading...";

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(getData);

  const friendRequestHandler = (data) => {
    // alert(data?.email)

    const sendRequest = {
      frndRqstSendarName: logUser?.name,
      frndRqstSendarEmail: logUser?.email,
      frndRqstSendarImage: logUser?.image,

      frndRqstReceiverName: data?.name,
      frndRqstReceiverEmail: data?.email,
      frndRqstReceiverImage: data?.image,

      //! role : `${data?.email}'s friend`,
      role: "friend request",
    };

    // alert(sendRequest.role)

    //! Send friend Request ....
    fetch("http://localhost:5001/friend-request", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendRequest),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result) {
          const dynamicUserPUT = {
            friendRequestedBy: logUser.email,
          };

          //! Update cover photo for user collection
          fetch(`http://localhost:5001/update-friend-request/${data?.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(dynamicUserPUT),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success("Successfully send friend request");
            });
        }
      });
  };

  return (
    <div>
      <div className="py-8 md:px-4 ">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Friends Team
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="1d4040f3-9f3e-4ac7-b117-7d4009658ced"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#1d4040f3-9f3e-4ac7-b117-7d4009658ced)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Your</span>
            </span>
            <span className="font-bold text-gray-500"> {getData?.length}</span>{" "}
            friends are here
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque rem aperiam, eaque ipsa quae.
          </p>
        </div>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {getData.length >= 1 &&
            getData?.map((data, i) => (
              <div>
                <div className="flex flex-col border border-slate-200 justify-center shadow-lg bg-slate-100 text-black w-full px-8 my-12 text-center rounded-md ">
                  <img
                    className="self-center border border-slate-400 flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full"
                    src={data?.image}
                    alt="Person"
                  />

                  <div className="flex-1 my-4">
                    <Link to={`/others/${data?.email}`}>
                      <p className="text-xl font-semibold leading-snug hover:underline">
                        {data?.name.slice(0, 10)}{" "}
                        {data?.name.length >= 10 && <span>...</span>}
                      </p>
                    </Link>

                    <p className="flex">
                      {data?.email.slice(0, 18)}{" "}
                      {data?.email.length >= 19 && <span>...</span>}
                    </p>
                  </div>
                  <div className="flex items-center justify-center p-3 space-x-3 border-t-2 border-black">
                    <button
                      onClick={() => friendRequestHandler(data)}
                      className="btn bg-blue-500 hover:bg-blue-600 border-0 w-full md:w-52 flex"
                    >
                      {" "}
                      <BsFillPersonPlusFill className="text-xl mx-3" /> Add
                      Friend
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <AutoSlider></AutoSlider> */}
    </div>
  );
};

export default Friends;
