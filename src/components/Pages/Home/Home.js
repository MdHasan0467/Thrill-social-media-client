import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import {
  BsDistributeHorizontal,
  BsDistributeVertical,
  BsFillChatFill,
  BsThreeDots,
  //   BsShareFill,
} from "react-icons/bs";
// import { AiFillLike } from 'react-icons/ai';
// import { BsFillChatFill, BsShareFill } from 'react-icons/bs';
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import DescriptionModal from "../../Modals/DescriptionModal/DescriptionModal";
import OptionModal from "./OptionModal/OptionModal";
import PostBox from "./PostBox/PostBox";
import Stories from "./Stories/Stories";
// import { Translator, Translate } from 'react-auto-translate';
// import { BsCheckLg } from 'react-icons/bs';

const Home = () => {
  const { logUser, loading } = useContext(AuthContext);

  // set modal data
  const [descriptionModal, setDescriptionModal] = useState(0);

  // set modal data
  const [optionModalData, setOptionModalData] = useState(0);

  const [likes, setLikes] = useState(0);

  const [unlike, setUnLike] = useState();

  //! get all data from mongoDB
  const [getsData, setGetsData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  //* koto gulo page hobe,, default 0 index number page a thakbe
  const [page, setPage] = useState(1);

  //* Every page a koto gulo data dekhabe, Default 4 ta kore data dekhabe
  const [dataSize, setDataSize] = useState(3);

  const pages = Math.ceil(dataCount / dataSize);
  // console.log(pages)

  //     useEffect(() => {
  //         fetch(`http://localhost:5001/allData?page=${page}&dataSize=${dataSize}`)
  //     .then(res => res.json())
  //         .then(result => {
  //             if (result === undefined) {
  //                 return 'Loading...'
  //             }
  //             else {
  //                 setGetsData(result.result);
  //                 setDataCount(result.count);
  //                 // window.location.reload()
  //             }
  //    })
  //     }, [page, dataSize])

  useEffect(() => {
    fetch("http://localhost:5001/all-posts")
      .then((res) => res.json())
      .then((result) => {
        if (result === undefined) {
          return "Loading...";
        } else {
          setGetsData(result.reverse());
        }
      });
  }, []);

  // console.log(getsData)

  //! For Display 4 data from array by randomly .. .. ..
  const n = 2; // number of elements we want to get
  const shuffledArray = getsData.sort(() => 0.5 - Math.random()); // shuffles array
  const resultData = shuffledArray.slice(0, n + 1); // gets first n elements after shuffle

  const handleLike = (id) => {
    fetch(`http://localhost:5001/like/${id}`)
      .then((res) => res.json())
      .then((result) => setLikes(result.likes));

    const addedLike = {
      likes: likes + 1,
      likerName: logUser?.name,
      likerEmail: logUser?.email,
      LikerImage: logUser?.image,
    };

    //! added Like info to the database....
    fetch(`http://localhost:5001/like/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addedLike),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(`Successfully set ${addedLike.likes} like reaction`,{
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // window.location.reload(true);
      });
  };

  const handleUnLike = (id) => {
    fetch(`http://localhost:5001/like/${id}`)
      .then((res) => res.json())
      .then((result) => setUnLike(result.likes));

    const addedLike = {
      likes: "",
      likerName: logUser?.name,
      likerEmail: logUser?.email,
      LikerImage: logUser?.image,
    };
    // console.log(addedLike.likes);

    //! remove Like info to the database....
    fetch(`http://localhost:5001/like/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addedLike),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(`Successfully set unlike reaction`,{
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // window.location.reload(true);
        refetch();
      });
  };

  const {
    isLoading,
    error,
    data: totalData,
    refetch,
  } = useQuery({
    queryKey: ["totalData"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5001/status");
        const data = await res.json();
        if (data === undefined) {
          return "Loading...";
        } else {
          return data.result;
        }
      } catch (err) {
        // console.error(err);
      }
    },
  });

  // if (loading === undefined) return "Loading...";

  if (loading) return "Loading...";
  // if (loading) return toast.loading('Please wait a moment!',{
  //   position: "bottom-center",
  //   autoClose: 2000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "dark",
  // });

  // if (error) return 'An error has occurred: ' + error.message;

  //! Refresh for see more button
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      {/* Reels ========== */}
      <div className="flex justify-center my-5">
        <Stories />
      </div>

      {/* Post Box ========== */}
      <div className="flex justify-center mt-7 mb-5">
        <PostBox />
      </div>

      {/* Posts ========== */}
      <div className="grid grid-cols-1">
        <OptionModal getsData={optionModalData} />
      </div>

      {/* Pagination ========== */}
      <div className=" hidden mb-5">
        <p className="font-semibold my-3">
          Currently selected page: {page} and data: {dataSize}
        </p>

        {/* Button Show */}

        {[...Array(pages).keys()].map((btn) => (
          <button
            className="btn btn-primary mx-2"
            key={btn}
            onClick={() => setPage(btn + 1)}
          >
            {btn + 1}
          </button>
        ))}

        <select onChange={(e) => setDataSize(e.target.value)}>
          {totalData?.map((_, i) => (
            <option value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {/* All Data Show */}
      {resultData?.map((data, i) => (
        <div
          key={data._id}
          className="flex justify-center mt-8 mb-16 md:mt-5 md:mb-5"
        >
          <div className=" bg-white md:bg-slate-100 rounded-lg shadow-lg w-[100vw] md:w-[480px] ">
            {/* feelings */}
            <div className="flex items-center bg-slate-50 rounded-lg shadow-lg justify-between p-3">
              <div className="flex items-center space-x-2">
                <Link to={`/others/${data?.authorEmail}`}>
                  <img
                    src={data?.authorImage}
                    alt="profile"
                    className="object-cover object-center w-8 h-8 rounded-full hover:ring ring-primary ring-offset-base-100 ring-offset-2 shadow-sm "
                  />
                </Link>

                <div className="-space-y-1">
                  <div className="flex items-center">
                    <Link
                      to={`/others/${data?.authorEmail}`}
                      className="text-sm font-semibold leading-none text-start hover:underline"
                    >
                      {data?.authorName}
                    </Link>

                    {data?.feelings ? (
                      <>
                        {data?.feelings === "😍 happy" && (
                          <p className="mx-2 ">
                            - feeling
                            <span className="font-semibold">
                              {data?.feelings}
                            </span>
                          </p>
                        )}

                        {data?.feelings === "😭 sad" && (
                          <p className="mx-2 ">
                            - feeling
                            <span className="font-semibold">
                              {data?.feelings}
                            </span>
                          </p>
                        )}

                        {data?.feelings === "😎 chill" && (
                          <p className="mx-2 ">
                            - feeling
                            <span className="font-semibold">
                              {data?.feelings}
                            </span>
                          </p>
                        )}

                        {data?.feelings === "🤩 excited" && (
                          <p className="mx-2 ">
                            - feeling
                            <span className="font-semibold">
                              {data?.feelings}
                            </span>
                          </p>
                        )}

                        {data?.feelings === "🥱 bored" && (
                          <p className="mx-2 ">
                            - feeling
                            <span className="font-semibold">
                              {data?.feelings}
                            </span>
                          </p>
                        )}

                        {data?.feelings === "😡 angry" && (
                          <p className="mx-2 ">
                            - feeling
                            <span className="font-semibold">
                              {data?.feelings}
                            </span>
                          </p>
                        )}

                        {data?.feelings === "😋 hungry" && (
                          <p className="mx-2 ">
                            - feeling
                            <span className="font-semibold">
                              {data?.feelings}
                            </span>
                          </p>
                        )}
                        {data?.feelings === "😜 funny" && (
                          <p className="mx-2 ">
                            - feeling
                            <span className="font-semibold">
                              {data?.feelings}
                            </span>
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="mx-2 ">
                        - 📂 Sharing
                        <span className="font-semibold mx-2">{data?.category}</span>
                      </p>
                    )}
                  </div>

                  {/* <span className="inline-block text-xs leading-none">{data?.authorEmail}</span> */}

                  <span className="block text-xs text-start py-2 leading-none">
                    {data?.uploadedDay?.slice(0, 15)} - {data?.uploadedTime}
                  </span>
                </div>
              </div>
              {/** 
                    <label onClick={()=> setOptionModalData(data)} htmlFor="OptionModal" title="Open options" type="button" className='hover:cursor-pointer group'>
                        <BsDistributeVertical className='group-hover:hidden' />
                        <BsDistributeHorizontal className='group-hover:flex hidden' />
                    </label>
                    **/}
              <label
                htmlFor="OptionModal"
                title="Open options"
                type="button"
                className="hover:cursor-pointer group"
              >
                <BsThreeDots className="hover:font-bold hover:scale-125 duration-300" />
              </label>
            </div>

            <DescriptionModal descriptionModal={descriptionModal} />
            {data?.description && (
              <p className="text-start mx-5 my-5">
                {data?.description?.slice(0, 120)}
                {data?.description.length > 121 && (
                  <label
                    onClick={() => setDescriptionModal(data)}
                    htmlFor="Description-Modal"
                    className="mx-2 text-gray-400 cursor-pointer hover:text-gray-600"
                  >
                    see more . . .
                  </label>
                )}
              </p>
            )}

            {/* Show images which posted */}
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
                                className="h-[250px] hover:scale-110 duration-300 cursor-pointer"
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
                                className="h-[250px] hover:scale-110 duration-300 cursor-pointer"
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
                                className="h-[320px] w-full hover:scale-110 duration-300 cursor-pointer"
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
                                    className="h-[250px] w-[220px] cursor-pointer hover:scale-110 duration-300"
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
                                    className="h-[250px] w-[220px] cursor-pointer hover:scale-110 duration-300"
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
                                className="h-[340px] w-full cursor-pointer hover:scale-110 duration-300"
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

            {/*Likes  */}
            <div className="p-3">
              <div className="flex flex-wrap items-center pt-3 pb-1">
                <div className="flex items-center space-x-2">
                  {/**
                {likes === 0 &&
                    <></>
                  }
                  
                   {likes === 1 && 
                    <div className="flex -space-x-1">
                        <img  className="w-5 h-5 border rounded-full" src="https://source.unsplash.com/40x40/?portrait?1" alt="" />
                    </div> 
                  }
                  
                   {likes === 2 && 
                    <div className="flex -space-x-1">
                        <img  className="w-5 h-5 border rounded-full" src="https://source.unsplash.com/40x40/?portrait?1" alt="" />
                        <img className="w-5 h-5 border rounded-full" src="https://source.unsplash.com/40x40/?portrait?2" alt="" />
                    </div> 
                  }
                  
                   {likes >= 3 &&  
                    <div className="flex -space-x-1">
                        <img  className="w-5 h-5 border rounded-full" src="https://source.unsplash.com/40x40/?portrait?1" alt="" />
                        <img className="w-5 h-5 border rounded-full" src="https://source.unsplash.com/40x40/?portrait?2" alt="" />
                        <img className="w-5 h-5 border rounded-full " src="https://source.unsplash.com/40x40/?portrait?3" alt="" />
                    </div> 
                  }
                */}
                  <p className="text-sm">
                    {data?.likes && (
                      <span className="text-[#6200EA] font-semibold">
                        Likes :
                      </span>
                    )}
                    <span className="text-[#6200EA] font-semibold">
                      {data?.likes}
                    </span>
                  </p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex items-center justify-around">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="flex items-center justify-center"
                  >
                    {data?.likes ? (
                      <p
                        onClick={() => handleUnLike(data._id)}
                        className="flex"
                      >
                        <AiFillLike className="text-[#6200EA] text-2xl" />
                        <span className="text-[#6200EA]">UnLike</span>
                      </p>
                    ) : (
                      <p onClick={() => handleLike(data._id)} className="flex">
                        <AiFillLike className=" text-2xl" /> <span>Like</span>
                      </p>
                    )}
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="flex items-center justify-center group"
                  >
                    <BsFillChatFill className=" group-hover:text-[#6200EA] text-2xl mx-2"></BsFillChatFill>
                    <span className="group-hover:text-[#6200EA]">Comment</span>
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

      {/* See More Button */}
      <button
        title="Click to reload!"
        onClick={refreshPage}
        className="mx-5 text-2xl opacity-75 hover:opacity-100 my-5"
      >
        See more
      </button>
    </div>
  );
};

export default Home;
