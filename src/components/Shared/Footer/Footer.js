import React from "react";
const Footer = () => {
  return (
    <div className="flex justify-around bg-slate-200 py-3">
      <div>
        <img
          className="w-8"
          src="https://res.cloudinary.com/demfyxr7o/image/upload/v1719756409/Screenshot_2024-06-30_200057-removebg-preview_sb6rob.png"
          alt="logo"
        />
      </div>

      <div className="flex items-center justify-center">
        <div>
          <div className="flex space-x-2 justify-center">
            <p>© 2024 - Developed and maintained by</p>
            <a target="blank" href="https://mdhasan-portfolio.vercel.app/">
              MD HASAN official
            </a>
          </div>
          <p>Last Developed On - 21-06-2024 v1</p>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Footer;
