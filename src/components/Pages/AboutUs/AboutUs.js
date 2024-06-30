import React, { useState } from "react";
import { AiOutlineMail, AiTwotoneMail } from "react-icons/ai";
import {
  BsFacebook,
  BsFillAwardFill,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [admin, setAdmin] = useState();

  fetch("http://localhost:5001/admin")
    .then((res) => res.json())
    .then((result) => setAdmin(result));
  return (
    <div>
      {admin?.name ? (
        <section>
          <div>
            <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 bg-gray-200">
              {/* Profile Box*/}
              <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md  bg-slate-100">
                <img
                  src={admin?.image}
                  className="self-center flex-shrink-0 w-24 h-24 md:w-36 md:h-36 -mt-12 bg-center bg-cover rounded-full"
                  alt=""
                />
                <div className="flex-1 my-4">
                  <p className="text-xl font-semibold leading-snug flex text-start">
                    <span>Name : {admin?.name}</span>
                    <span>
                      <BsFillAwardFill className="text-orange-500" />
                    </span>
                  </p>
                  <p className="text-xl font-semibold leading-snug text-start">
                    Number : {admin?.phoneNumber}
                  </p>
                  <p className="text-xl font-semibold leading-snug text-start">
                    Email : {admin?.email}
                  </p>
                  <p className="flex bg-slate-50 px-2 py-5 mt-5 rounded-lg">
                    <span className="font-semibold">Intro :</span>{" "}
                    <span className="mx-2">{admin?.intro.slice(0, 120)}</span>{" "}
                    {admin?.intro.length === 121 && <span>. . .</span>}{" "}
                  </p>
                </div>
                <div className="divider"></div>
                {/* Social Media Icons */}
                <div className="flex mb-6 justify-center p-3 space-x-3 ">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    title="Email"
                    className=""
                  >
                    <AiTwotoneMail className="text-2xl hover:text-orange-600" />
                  </a>

                  <a
                    rel="noopener noreferrer"
                    target={"_blank"}
                    href="https://www.facebook.com/ornilhasan0467"
                    title="Facebook"
                    className=""
                  >
                    <BsFacebook className="text-2xl hover:text-blue-700" />
                  </a>

                  <a
                    rel="noopener noreferrer"
                    target={"_blank"}
                    href="https://www.linkedin.com/in/md-hasan-8aa8b7259/"
                    title="LinkedIn"
                    className=""
                  >
                    <BsLinkedin className="text-2xl hover:text-blue-400" />
                  </a>

                  <a
                    rel="noopener noreferrer"
                    target={"_blank"}
                    href="https://github.com/MdHasan0467"
                    title="GitHub"
                    className=""
                  >
                    <BsGithub className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*Cover Photo */}
          <img
            src={admin?.coverPhoto}
            alt=""
            className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40"
          />
        </section>
      ) : (
        <p>Coming Soon . . .</p>
      )}
    </div>
  );
};

export default AboutUs;
