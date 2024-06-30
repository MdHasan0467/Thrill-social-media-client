import React, { Component, useContext, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Slider from "react-slick";
import { BsPlusCircleDotted } from "react-icons/bs";
import { AuthContext } from "../../../../context/AuthProvider";
import UserReels from "../UserReels/UserReels";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//! For right arrow customization
// const NextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "blue" }}
//       onClick={onClick}
//     />
//   );
// }

//! For left arrow customization
// const PrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

const Carousel = () => {
  const [reels, setReels] = useState([]);

  //! Get Reels....
  useEffect(() => {
    fetch("http://localhost:5001/reels")
      .then((res) => res.json())
      .then((result) => setReels(result));
  }, []);

  const { logUser } = useContext(AuthContext);

  const handleLoginError = () => {
    toast.error("login first!");
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />
  };

  return (
    <div className="my-5 md:w-[480px] w-[375px] flex">
      {/* Reel upload modal */}
      {logUser && <UserReels />}

      <div>
        <img
          className="border-4 hidden md:block w-28 h-52 relative object-cover object-center"
          src={logUser?.image}
          alt=""
        />
        <div className="bg-white absolute md:w-28 md:h-20 bottom-5 border-4 ">
          {logUser ? (
            <label htmlFor="Reels-Post-Modal">
              <BsPlusCircleDotted
                htmlFor="Reels-Post-Modal"
                className="absolute bottom-3 md:left-6 left-[-5px] md:border-0 border-black border border-dotted p-2 z-50 w-20 h-20 md:rounded-r-none  rounded-r-full md:w-auto md:h-auto cursor-pointer hover:text-primary text-black bg-white text-4xl"
              />
            </label>
          ) : (
            <label onClick={handleLoginError}>
              <BsPlusCircleDotted className="absolute bottom-3 md:left-6 left-[-5px] md:border-0 border-black border border-dotted p-2 z-50 w-20 h-20 md:rounded-r-none  rounded-r-full md:w-auto md:h-auto cursor-pointer hover:text-primary text-black bg-white text-4xl" />
            </label>
          )}
        </div>
      </div>

      <div className="w-[360px]">
        {reels.length >= 4 ? (
          <Slider {...settings} className="overflow-hidden">
            {reels?.map((reel) => (
              <PhotoProvider>
                <PhotoView src={reel?.image}>
                  <div>
                    <img
                      title="click to view"
                      className="border-4 w-28 h-52 object-cover object-center relative cursor-pointer"
                      src={reel.image}
                      alt=""
                    />

                    <Link to={`/others/${reel?.authorEmail}`}>
                      <img
                        src={reel?.authorImage}
                        className="absolute top-5 ml-2 w-8 h-8 border border-primary hover:border-white rounded-full object-cover object-center cursor-pointer"
                        alt=""
                      />
                    </Link>
                  </div>
                </PhotoView>
              </PhotoProvider>
            ))}
          </Slider>
        ) : (
          <div className="flex w-[360px]">
            {reels[0] && (
              <PhotoProvider>
                <PhotoView src={reels[0]?.image}>
                  <div>
                    <img
                      title="click to view"
                      className="border-4 w-28 h-52 object-cover object-center cursor-pointer"
                      src={reels[0]?.image}
                      alt=""
                    />
                  </div>
                </PhotoView>
              </PhotoProvider>
            )}
            {reels[1] && (
              <PhotoProvider>
                <PhotoView src={reels[1]?.image}>
                  <div>
                    <img
                      title="click to view"
                      className="border-4 w-28 h-52 object-cover object-center cursor-pointer"
                      src={reels[1]?.image}
                      alt=""
                    />
                  </div>
                </PhotoView>
              </PhotoProvider>
            )}
            {reels[2] && (
              <PhotoProvider>
                <PhotoView src={reels[2]?.image}>
                  <div>
                    <img
                      title="click to view"
                      className="border-4 w-28 h-52 object-cover object-center cursor-pointer"
                      src={reels[2]?.image}
                      alt=""
                    />
                  </div>
                </PhotoView>
              </PhotoProvider>
            )}

            {reels.length <= 3 && (
              <div className="items-center flex">
                <p>Four images need for Slide</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
