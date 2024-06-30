import React from "react";
import { Outlet } from "react-router-dom";
import LargeNavbar from "../../Shared/LargeNavbar/LargeNavbar";
import LeftSidebar from "../../Shared/LeftSidebar/LeftSidebar";
import MobileNavbar from "../../Shared/MobileNavbar/MobileNavbar";
import Scrollbars from "react-custom-scrollbars-2";

const ProfileLeyar = () => {
  return (
    <div className="relative bg-base-200">
      <div className="sticky top-0 z-50 hidden md:block">
        <LargeNavbar />
      </div>

      <div className="grid grid-cols-12">
        <Scrollbars
          style={{ height: 600 }}
          className="sideBar col-span-3 hidden md:block"
        >
          <LeftSidebar />
        </Scrollbars>

        <Scrollbars
          style={{ height: 600 }}
          className="main-profile col-span-12 md:col-span-9 md:mb-0 mb-20"
        >
          <Outlet />
        </Scrollbars>
      </div>

      <div className="md:hidden sticky bottom-0 z-50">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default ProfileLeyar;
