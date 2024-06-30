import React from "react";
import { Link, Outlet } from "react-router-dom";
import LargeNavbar from "../../Shared/LargeNavbar/LargeNavbar";
import LeftSidebar from "../../Shared/LeftSidebar/LeftSidebar";
import MobileNavbar from "../../Shared/MobileNavbar/MobileNavbar";
import RightSidebar from "../../Shared/RightSidebar/RightSidebar";
import Scrollbars from "react-custom-scrollbars-2";
import GoogleLoginPrompt from "../../hooks/GoogleLoginPrompt";
import Footer from "../../Shared/Footer/Footer";
import { BsMessenger } from "react-icons/bs";

const Main = () => {
  return (
    <div className="relative">
      <div>
        <div className="sticky top-0 z-50 hidden md:block">
          <LargeNavbar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 ">
          <Scrollbars
            style={{ height: 600 }}
            className="left hidden md:block md:col-span-3 border min-h-screen bg-slate-200 py-5"
          >
            <LeftSidebar />
          </Scrollbars>

          <Scrollbars
            style={{ height: 675 }}
            className="outlet md:col-span-6 bg-slate-200 py-5"
          >
            <Outlet />
          </Scrollbars>

          <div className="md:hidden sticky bottom-0 z-50">
            <MobileNavbar />
          </div>

          <Scrollbars
            style={{ height: 600 }}
            className="right md:col-span-3 border min-h-screen bg-slate-200 py-5 hidden md:block"
          >
            <RightSidebar />
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
          </Scrollbars>
          <GoogleLoginPrompt />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
