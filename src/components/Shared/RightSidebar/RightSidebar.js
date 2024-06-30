import React from 'react';
import Slider from '../Slider/Slider';
import ContactFriends from './ContactFriends/ContactFriends';
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai";
import { BsFillPlusSquareFill, BsPlusSquareDotted } from "react-icons/bs";

const RightSidebar = () => {
 
    return (
        <div>
            <Slider />
            
            <div className="flex justify-between my-5 mx-5">
        <p className="text-lg font-serif">Contact with friends</p>

        <div className="flex">
          <div className="group mx-5">
            <AiOutlineCamera
              title="coming soon"
              className="group-hover:hidden cursor-pointer text-xl"
            />
            <AiFillCamera
              title="coming soon"
              className="group-hover:flex hidden cursor-pointer text-xl"
            />
          </div>
          <div className="group">
            <BsPlusSquareDotted
              title="coming soon"
              className="group-hover:hidden cursor-pointer text-xl"
            />
            <BsFillPlusSquareFill
              title="coming soon"
              className="group-hover:flex hidden cursor-pointer text-xl"
            />
          </div>
        </div>
      </div>
            <ContactFriends />
        </div>
    );
};

export default RightSidebar;