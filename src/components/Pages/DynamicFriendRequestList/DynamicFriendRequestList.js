import React, { useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import {
  // BsPersonFillAdd,
  // BsPersonAdd,
  // BsFillPersonPlusFill,
  BsFillPersonCheckFill,
  BsFillPersonXFill,
} from "react-icons/bs";

const DynamicFriendRequestList = () => {
  const { logUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const userData = useLoaderData();
  console.log(userData);

  //! Accept Friend Request
  const friendRequestHandler = (data) => {
    // alert(data?.email)

    const acceptRequest = {
      frndRqstSendarName: data?.frndRqstSendarName,
      frndRqstSendarEmail: data?.frndRqstSendarEmail,
      frndRqstSendarImage: data?.frndRqstSendarImage,

      frndRqstReceiverName: logUser?.name,
      frndRqstReceiverEmail: logUser?.email,
      frndRqstReceiverImage: logUser?.image,

      role: `${logUser?.email}'s friend`,
    };

    // alert(sendRequest.role)

    //! Save friend Request to the database....
    fetch("http://localhost:5001/friend-request-accept", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(acceptRequest),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        toast.success("Successfully confirm friend request",{
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        //! Delete post
        fetch(`http://localhost:5001/post/${data?._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              navigate(`/profile/Dynamic-Friend-List/${logUser?.email}`);

              // toast.success(`delete successfully!!`);
              //  window.location.reload(true);
            }
          });
      });
  };

  //! Cancel friend List
  const cancelFriendRequestHandler = (data) => {
    //! Delete post
    fetch(`http://localhost:5001/post/${data?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.error(`delete successfully!!`,{
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
  };

  return (
    <div className="mt-5">
      {userData.length <= 0 && (
        <p className="text-4xl font-serif font-bold">
          No friend request available
        </p>
      )}
      {userData.length > 0 && (
        <p className="text-4xl font-bold text-start ml-20 my-5">
          Friend Request : {userData.length}
        </p>
      )}

      <div className="grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-28 md:py-52">
        {userData.length >= 1 &&
          userData?.map((data, i) => (
            <div>
              <div className="flex flex-col border border-slate-200 justify-center shadow-lg bg-slate-100 text-black w-full px-8 my-12 text-center rounded-md ">
                <img
                  className="self-center border border-slate-400 flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full"
                  src={data?.frndRqstSendarImage}
                  alt="Person"
                />

                <div className="flex-1 my-4">
                  <Link to={`/others/${data?.frndRqstSendarEmail}`}>
                    <p className="text-xl font-semibold leading-snug hover:underline">
                      {data?.frndRqstSendarName}
                    </p>
                  </Link>

                  <p>{data?.email}</p>
                </div>
                <div className="flex items-center justify-center p-3 space-x-3 border-t-2 border-black">
                  <button
                    onClick={() => friendRequestHandler(data)}
                    className="btn bg-blue-500 hover:bg-blue-600 border-0 w-full md:w-52 flex"
                  >
                    {" "}
                    <BsFillPersonCheckFill className="text-xl mx-3" /> Accept
                    Request
                  </button>
                </div>
                <div className="flex items-center justify-center p-3 space-x-3 ">
                  <button
                    onClick={() => cancelFriendRequestHandler(data)}
                    className="btn bg-red-500 hover:bg-red-600 border-0 w-full md:w-52 flex"
                  >
                    {" "}
                    <BsFillPersonXFill className="text-xl mx-3" /> Cancel
                    Request
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DynamicFriendRequestList;
