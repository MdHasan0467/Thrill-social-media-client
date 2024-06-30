import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const LastUploadedFeelings = () => {
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
        const res = await fetch(`http://localhost:5001/feelings/${user.email}`);
        const data = await res.json();
        return data.reverse()[0];
      } catch (err) {
        console.error(err);
      }
    },
  });

  // console.log(getData)

  if (loading) return "Loading...";

  return (
    <div>
      {getData?.feelings && (
        <div className="card bg-base-100 shadow-xl">
          <h1 className="mb-5 text-2xl font-serif font-thin">
            Your Last Uploaded Feelings
          </h1>

          {getData?.feelings === "happy" && (
            <p className="text-start mx-5 my-5">
              The user is feeling {getData?.feelings} 😍
            </p>
          )}

          {getData?.feelings === "sad" && (
            <p className="text-start mx-5 my-5">
              The user is feeling {getData?.feelings} 😢
            </p>
          )}

          {getData?.feelings === "excited" && (
            <p className="text-start mx-5 my-5">
              The user is feeling {getData?.feelings} 😎
            </p>
          )}

          {getData?.feelings === "bored" && (
            <p className="text-start mx-5 my-5">
              The user is feeling {getData?.feelings} 🥱
            </p>
          )}

          {getData?.feelings === "angry" && (
            <p className="text-start mx-5 my-5">
              The user is feeling {getData?.feelings} 😡
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LastUploadedFeelings;
