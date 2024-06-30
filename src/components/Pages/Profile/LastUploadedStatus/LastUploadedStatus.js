import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const LastUploadedStatus = () => {
  const { user, loading } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data: getData,
    refetch,
  } = useQuery({
    queryKey: ["getData"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5001/status/${user.email}`);
        const data = await res.json();
        return data.reverse()[0];
      } catch (err) {
        console.error(err);
      }
    },
  });

  // console.log(getData?.description)

  if (loading) return "Loading...";

  return (
    <div>
      {getData?.description && (
        <div className="card bg-base-100 shadow-xl">
          <h1 className="mb-5 text-2xl font-serif font-thin">
            Your Last Uploaded Status
          </h1>

          <p className="text-start mx-5 my-5">{getData?.description}</p>
        </div>
      )}
    </div>
  );
};

export default LastUploadedStatus;
