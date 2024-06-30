import React, { useContext, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import {
  BsDistributeHorizontal,
  BsDistributeVertical,
  BsFillChatFill,
} from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { AuthContext } from "../../../context/AuthProvider";
import OptionModal from "../../Home/OptionModal/OptionModal";

const DynamicProfilePostedData = ({ userData }) => {
  const { loading } = useContext(AuthContext);

  const [getData, setGetData] = useState();

  const [getsData, setGetsData] = useState();

  // const { isLoading, error, data: getData, refetch } = useQuery({
  //     queryKey: ['getData'],
  //     queryFn: async () => {
  // 		try {
  // 			const res = await fetch(`http://localhost:5001/data/${user.email}`);
  // 			const data = await res.json();
  //             return data.reverse();
  // 		} catch (err) {
  // 			console.error(err);
  // 		}
  // 	},
  //   })

  useEffect(() => {
    fetch(`http://localhost:5001/data/${userData?.email}`)
      .then((res) => res.json())
      .then((data) => setGetData(data.reverse()));
  }, [userData?.email]);

  console.log(getData);

  if (loading) return "Loading...";

  return (
    <div>
      <div className="grid grid-cols-1">
        <OptionModal getsData={getsData}></OptionModal>

        {getData?.map((data) => (
          <div key={data._id} className="flex justify-center my-5">
            <div className="rounded-lg bg-slate-100 shadow-lg sm:w-96 md:w-[480px]">
              <div className="flex bg-slate-50 rounded-lg shadow-lg items-center justify-between p-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={data?.authorImage}
                    alt="profile"
                    className="object-cover object-center w-8 h-8 rounded-full shadow-sm "
                  />

                  <div className="-space-y-1">
                    <div className="flex items-center">
                      <h2 className="text-sm font-semibold leading-none text-start">
                        {data?.authorName}
                      </h2>
                      {data?.feelings === "happy" && (
                        <p className="mx-2 ">
                          {" "}
                          - 😍 feeling{" "}
                          <span className="font-semibold">
                            {data?.feelings}
                          </span>{" "}
                        </p>
                      )}

                      {data?.feelings === "sad" && (
                        <p className="mx-2 ">
                          {" "}
                          - 😭 feeling{" "}
                          <span className="font-semibold">
                            {data?.feelings}
                          </span>{" "}
                        </p>
                      )}

                      {data?.feelings === "chill" && (
                        <p className="mx-2 ">
                          {" "}
                          - 😎 feeling{" "}
                          <span className="font-semibold">
                            {data?.feelings}
                          </span>{" "}
                        </p>
                      )}

                      {data?.feelings === "excited" && (
                        <p className="mx-2 ">
                          {" "}
                          - 🤩 feeling{" "}
                          <span className="font-semibold">
                            {data?.feelings}
                          </span>{" "}
                        </p>
                      )}

                      {data?.feelings === "bored" && (
                        <p className="mx-2 ">
                          {" "}
                          - 🥱 feeling{" "}
                          <span className="font-semibold">
                            {data?.feelings}
                          </span>{" "}
                        </p>
                      )}

                      {data?.feelings === "angry" && (
                        <p className="mx-2 ">
                          {" "}
                          - 😡 feeling{" "}
                          <span className="font-semibold">
                            {data?.feelings}
                          </span>{" "}
                        </p>
                      )}

                      {data?.feelings === "hungry" && (
                        <p className="mx-2 ">
                          {" "}
                          - 😋 feeling{" "}
                          <span className="font-semibold">
                            {data?.feelings}
                          </span>{" "}
                        </p>
                      )}
                      {data?.feelings === "funny" && (
                        <p className="mx-2 ">
                          {" "}
                          - 😜 feeling{" "}
                          <span className="font-semibold">
                            {data?.feelings}
                          </span>{" "}
                        </p>
                      )}
                    </div>
                    {/* <span className="inline-block text-xs leading-none">{data?.authorEmail}</span> */}
                    <span className="block text-xs text-start py-2 leading-none">
                      {data?.uploadedDay?.slice(0, 15)} - {data?.uploadedTime}
                    </span>
                  </div>
                </div>

                {/** Option button **/}
                <label
                  onClick={() => setGetsData(data)}
                  htmlFor="OptionModal"
                  title="Open options"
                  type="button"
                  className="hover:cursor-pointer group"
                >
                  <BsDistributeVertical className="group-hover:hidden" />
                  <BsDistributeHorizontal className="group-hover:flex hidden" />
                </label>
              </div>

              {data?.description && (
                <p className="text-start mx-5 my-5">{data?.description}</p>
              )}

              <div className="image">
                <section className="py-6 px-6">
                  {data?.image && (
                    <div className="container">
                      {data?.image3 ? (
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-2 ">
                            <PhotoProvider>
                              <PhotoView src={data?.image} r>
                                <img
                                  src={data?.image}
                                  alt="first"
                                  className="h-[320px] hover:border cursor-pointer"
                                />
                              </PhotoView>
                            </PhotoProvider>
                          </div>

                          <div className="col-span-2">
                            <PhotoProvider>
                              <PhotoView src={data?.image2}>
                                <img
                                  src={data?.image2}
                                  alt="second"
                                  className="h-[320px] hover:border cursor-pointer"
                                />
                              </PhotoView>
                            </PhotoProvider>
                          </div>

                          <div className="col-span-4">
                            <PhotoProvider>
                              <PhotoView src={data?.image3}>
                                <img
                                  src={data?.image3}
                                  alt="third"
                                  className="h-[320px] w-full hover:border cursor-pointer"
                                />
                              </PhotoView>
                            </PhotoProvider>
                          </div>
                        </div>
                      ) : (
                        <>
                          {data?.image2 ? (
                            <div className="grid grid-cols-4 gap-4">
                              <div className="col-span-2">
                                <PhotoProvider>
                                  <PhotoView src={data?.image} r>
                                    <img
                                      src={data?.image}
                                      alt="first"
                                      className="h-[320px] w-[220px] cursor-pointer hover:border"
                                    />
                                  </PhotoView>
                                </PhotoProvider>
                              </div>

                              <div className="col-span-2">
                                <PhotoProvider>
                                  <PhotoView src={data?.image2}>
                                    <img
                                      src={data?.image2}
                                      alt="second"
                                      className="h-[320px] w-[220px] cursor-pointer hover:border"
                                    />
                                  </PhotoView>
                                </PhotoProvider>
                              </div>
                            </div>
                          ) : (
                            <PhotoProvider>
                              <PhotoView src={data?.image}>
                                <img
                                  src={data?.image}
                                  alt="first"
                                  className="h-[340px] w-full cursor-pointer hover:border"
                                />
                              </PhotoView>
                            </PhotoProvider>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </section>
              </div>

              <div className="p-3">
                <div className="flex flex-wrap items-center pt-3 pb-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                      <img
                        className="w-5 h-5 border rounded-full"
                        src="https://source.unsplash.com/40x40/?portrait?1"
                        alt=""
                      />
                      <img
                        className="w-5 h-5 border rounded-full"
                        src="https://source.unsplash.com/40x40/?portrait?2"
                        alt=""
                      />
                      <img
                        className="w-5 h-5 border rounded-full "
                        src="https://source.unsplash.com/40x40/?portrait?3"
                        alt=""
                      />
                    </div>
                    <span className="text-sm">
                      Liked by
                      <span className="font-semibold">Mamba UI</span>and
                      <span className="font-semibold">86 others</span>
                    </span>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="flex items-center justify-around">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex items-center justify-center"
                    >
                      <AiFillLike className="hover:text-[#6200EA] text-2xl"></AiFillLike>
                      Like
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex items-center justify-center"
                    >
                      <BsFillChatFill className="hover:text-[#6200EA] text-2xl mx-2"></BsFillChatFill>
                      Comment
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex items-center justify-center group"
                    >
                      <BiShare className=" group-hover:text-[#6200EA] text-2xl mx-2"></BiShare>
                      <span className="group-hover:text-[#6200EA]">Share</span>
                    </button>
                  </div>
                  {/*<button type="button" title="Bookmark post" className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                    <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                </svg>
            </button>*/}
                </div>
                <div className="divider"></div>

                <div className="space-y-3">
                  <p className="text-sm">
                    <span className="text-base font-semibold">
                      leroy_jenkins72
                    </span>
                    Nemo ea quasi debitis impedit!
                  </p>
                  <input
                    type="text"
                    placeholder="  Add a comment..."
                    className="w-full bg-base-300 h-10 px-5 py-0.5 border-none rounded-xl text-sm pl-0"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicProfilePostedData;
