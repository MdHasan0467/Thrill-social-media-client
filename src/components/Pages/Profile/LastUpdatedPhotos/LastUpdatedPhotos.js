import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const LastUpdatedPhotos = () => {
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
        const res = await fetch(`http://localhost:5001/photos/${user.email}`);
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
      <div className="last-updated-photos">
        {getData?.image3 ? (
          <div>
            <h1 className="mb-5 text-2xl font-serif font-thin">
              Your Last Uploaded Photos
            </h1>
            <div className="flex items-center justify-center -mx-4 lg:pl-8">
              <div className="flex flex-col items-end px-3">
                <img
                  className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                  src={getData?.image}
                  alt=""
                />
                <img
                  className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                  src={getData?.image2}
                  alt=""
                />
              </div>
              <div className="px-3">
                <img
                  className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                  src={getData?.image3}
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {getData?.image2 ? (
              <div>
                <h1 className="mb-5 text-2xl font-serif font-thin">
                  Your Last Updated Photos
                </h1>
                <div className="flex flex-col items-center px-3">
                  <img
                    className="object-cover mb-6 w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                    src={getData?.image2}
                    alt=""
                  />
                  <img
                    className="object-cover  rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                    src={getData?.image}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <>
                {getData?.image && (
                  <div>
                    <h1 className="mb-5 text-2xl font-serif font-thin">
                      Your Last Updated Photo
                    </h1>
                    <div className="px-3 flex justify-center">
                      <img
                        className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                        src={getData?.image}
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LastUpdatedPhotos;
