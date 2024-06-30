import React from "react";
import { Link, Outlet } from "react-router-dom";
import LargeNavbar from "../../Shared/LargeNavbar/LargeNavbar";
import LeftSidebar from "../../Shared/LeftSidebar/LeftSidebar";
import MobileNavbar from "../../Shared/MobileNavbar/MobileNavbar";
import GoogleLoginPrompt from "../../hooks/GoogleLoginPrompt";
import Footer from "../../Shared/Footer/Footer";
import { BsMessenger } from "react-icons/bs";
import Scrollbars from "react-custom-scrollbars-2";

const Others = () => {
  return (
    <div className="relative bg-base-200">
      <div className="sticky top-0 z-50 hidden md:block">
        <LargeNavbar />
      </div>
      <div className="grid grid-cols-12">
        <Scrollbars
          style={{ height: 600 }}
          className="sideBar md:col-span-3 hidden md:block"
        >
          <LeftSidebar />
        </Scrollbars>
        <Scrollbars
          style={{ height: 600 }}
          className="outlet md:col-span-9 col-span-12"
        >
          <Outlet />
        </Scrollbars>
        {/* Messenger logo */}
        <Link to="" className="fixed bottom-10 right-5">
          <button
            type="button"
            title="coming soon"
            className="relative px-4 py-4 bg-gradient-to-r  from-pink-500 via-purple-500 to-indigo-500 border-0 text-white shadow-slate-900 shadow-lg ml-4 overflow-hidden font-semibold rounded-full"
          >
            <BsMessenger className="text-white text-4xl" />
            <span className="absolute top-0 right-0 px-6 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/4 bg-violet-400">
              New
            </span>
          </button>
        </Link>
        {/* Google login */}
        <GoogleLoginPrompt />
      </div>
      <Footer />
      <div className="md:hidden sticky bottom-0 z-50">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Others;
