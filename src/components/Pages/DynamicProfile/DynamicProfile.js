import React from "react";
import {
  BsFacebook,
  BsGithub,
  BsInfoCircle,
  BsInfoCircleFill,
  BsLinkedin,
  BsMessenger,
  BsTwitter,
} from "react-icons/bs";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link, useLoaderData } from "react-router-dom";
import BigIntroModal from "../../Modals/BigIntroModal/BigIntroModal";
import UpdateUserSocialAccounts from "../../Modals/UpdateUserSocialAccounts/UpdateUserSocialAccounts";
import UserInfoModal from "../../Modals/UserInfoModal/UserInfoModal";
import ChatBox from "../ChatBox/ChatBox";
// import { AuthContext } from '../../context/AuthProvider';
// import IntroUpdateModal from '../../Modals/IntroUpdateModal/IntroUpdateModal';
import DynamicProfilePostedData from "./DynamicProfilePostedData/DynamicProfilePostedData";
import DynamicUserInfoModal from "./DynamicUserInfoModal/DynamicUserInfoModal";

const DynamicProfile = () => {
  // const {logUser} = useContext(AuthContext)

  const userData = useLoaderData();
  // console.log(userData)

  return (
    <div className="relative">
      <div className="shadow-lg m-2 rounded-lg md:mb-2 mb-20">
        {/* Cover Photo */}
        <div className="cover-photo border border-black">
          {userData?.coverPhoto ? (
            <PhotoProvider>
              <PhotoView src={userData?.coverPhoto} r>
                <img
                  title="cover photo"
                  className="cursor-pointer w-[100vw] h-[60vh] object-cover object-center"
                  src={userData?.coverPhoto}
                  alt="Cover photo"
                />
              </PhotoView>
            </PhotoProvider>
          ) : (
            <img
              src="https://www.saspcn.com/wp-content/themes/alberta/assets/images/placeholder2.jpg"
              className="w-[100vw] h-[60vh] object-cover object-center"
              alt="Cover photo"
            />
          )}
        </div>

        <div className="profile-intro-box md:flex md:justify-between">
          {/* Dynamic User Profile */}

          <div className="Profile-Box max-w-md p-8 items-center sm:flex sm:space-x-6">
            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
              <img
                src={userData?.image}
                className="object-cover object-center w-full h-full rounded"
                alt="image"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="user-intro">
                <DynamicUserInfoModal user={userData} />

                <div className="flex">
                  <label
                    htmlFor="Dynamic-User-Info-Modal"
                    title="User info"
                    className="User-Info group w-10 cursor-pointer"
                  >
                    <BsInfoCircle className="group-hover:hidden inline" />
                    <BsInfoCircleFill className="group-hover:inline hidden" />
                  </label>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">{userData?.name}</h2>
                <span className="text-sm">General manager</span>
              </div>
              <div className="space-y-1">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-label="Email address"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                    ></path>
                  </svg>
                  <span className="dark:text-gray-400">{userData?.email}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-label="Phonenumber"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                    ></path>
                  </svg>
                  <span className="dark:text-gray-400">
                    {userData?.phoneNumber}
                  </span>
                </span>

                {/* Social Media */}
                <div className="flex justify-between pt-2 space-x-4 align-center">
                  {userData?.githubURL && (
                    <a
                      rel="noopener noreferrer"
                      target={"_blank"}
                      href={userData?.githubURL}
                      aria-label="GitHub"
                      className="p-2 rounded-md cursor-pointer"
                    >
                      <BsGithub className="text-2xl" />
                    </a>
                  )}

                  {userData?.facebookURL && (
                    <a
                      rel="noopener noreferrer"
                      target={"_blank"}
                      href={userData?.facebookURL}
                      aria-label="Facebook"
                      className="p-2 rounded-md cursor-pointer"
                    >
                      <BsFacebook className="text-2xl" />
                    </a>
                  )}

                  {userData?.twitterURL && (
                    <a
                      rel="noopener noreferrer"
                      target={"_blank"}
                      href={userData?.twitterURL}
                      aria-label="Twitter"
                      className="p-2 rounded-md cursor-pointer"
                    >
                      <BsTwitter className="text-2xl" />
                    </a>
                  )}

                  {userData?.linkedinURL && (
                    <a
                      rel="noopener noreferrer"
                      target={"_blank"}
                      href={userData?.linkedinURL}
                      aria-label="Linkedin"
                      className="p-2 rounded-md cursor-pointer"
                    >
                      <BsLinkedin className="text-2xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic User Intro */}
          {userData?.intro && (
            <div className="Intro">
              <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
                <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                  <BigIntroModal />
                  <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12">
                    <h1 className="text-2xl font-serif font-semibold uppercase">
                      Intro
                    </h1>

                    <p className="relative px-6 py-1 text-lg italic text-center">
                      <FaQuoteLeft className="w-8 h-8" />

                      {userData?.intro && (
                        <>
                          {userData?.intro.slice(0, 120)}{" "}
                          {userData?.intro.length >= 120 && (
                            <label
                              htmlFor="Big-Intro-Modal"
                              className="cursor-pointer text-gray-400"
                            >
                              more. . .
                            </label>
                          )}
                        </>
                      )}

                      <FaQuoteRight className="absolute right-0 w-8 h-8" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="my-10">
        <DynamicProfilePostedData userData={userData} />
      </div>

      {/* Chat */}

      {/*<Link to={`/chat/${userData?.email}`} className="fixed bottom-10 right-5">
            <button type="button" className="relative px-4 py-4 bg-gradient-to-r  from-pink-500 via-purple-500 to-indigo-500 border-0 text-white shadow-slate-900 shadow-lg ml-4 overflow-hidden font-semibold rounded-full">
                <BsMessenger className='text-white text-4xl' />
            <span className="absolute top-0 right-0 px-6 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/4 bg-violet-400">New</span>
           </button>
            
            </Link>*/}
    </div>
  );
};

export default DynamicProfile;
