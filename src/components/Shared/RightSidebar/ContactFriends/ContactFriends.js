import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";


const ContactFriends = () => {
  const { logUser } = useContext(AuthContext);

  // ! get all contacts user
  const {
    isLoading,
    error,
    data: getData,
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

  return (
    <div>

      {getData.length >= 1 &&
        getData?.map((user) => (
          <Link to={`/others/${user?.email}`}>
            <div className="flex hover:bg-base-100 w-full rounded-3xl cursor-pointer hover:shadow-lg my-5">
              <img
                className="w-10 h-10 rounded-full"
                src={user?.image}
                alt=""
              />
              <p className="items-center flex mx-2">{user?.name}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ContactFriends;
