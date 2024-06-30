import React, { useState } from 'react';
import { BsFacebook, BsLinkedin } from 'react-icons/bs';
import { Link, useLoaderData } from 'react-router-dom';
import LargeNavbar from '../../Shared/LargeNavbar/LargeNavbar';
import MobileNavbar from '../../Shared/MobileNavbar/MobileNavbar';

const DynamicFriendList = () => {


    // const [friendList, setFriendList] = useState()

    
    const userData = useLoaderData();
    // setFriendList(userData)
    console.log(userData)
  



  





    return (
        <div>
        
        <div className='mt-5'>
            {
                userData.length <= 0 && <p className='text-4xl font-serif font-bold'>No friend available</p>
            }
            {
                userData.length > 0 && <p className='text-4xl font-bold text-start ml-20 md:ml-52 my-5'>Friend List : {userData.length}</p>
            }
        
        
    <div className="grid gap-10 mx-auto lg:grid-cols-2 lg:max-w-screen-lg">
    { userData.length >= 1 &&
        userData?.map((data, i) => 
        <Link to={`/others/${data?.frndRqstSendarEmail}`}>
        <div className="grid sm:grid-cols-3 p-3 mb-20 md:mb-0 border-b border-black md:border-0 hover:shadow-lg rounded-lg hover:bg-slate-100">
        <div className="relative w-full h-48 max-h-full rounded shadow sm:h-auto">
          <img
            className="absolute object-cover w-full h-full rounded"
            src={data?.frndRqstSendarImage}
            alt="Person"
          />
        </div>
        <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
        <Link to={`/others/${data?.frndRqstSendarEmail}`}>
        <p className="text-lg font-bold text-start hover:underline">{data?.frndRqstSendarName}</p>
        </Link>
          <p className="mb-4 text-xs text-gray-800 text-start">{data?.frndRqstSendarEmail}</p>
          <p className="mb-4 text-sm tracking-wide text-gray-800 text-start">
            Vincent Van Gogh’s most popular painting, The Starry Night.
          </p>
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <BsFacebook className='text-3xl text-black
               hover:text-blue-700' />
            </a>
            <a
              href="/"
              className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <BsLinkedin className='text-3xl text-black
               hover:text-blue-400' />
            </a>
          </div>
        </div>
      </div>
      </Link>
    )
    }
  </div>
        </div>
         
        </div>
    );
};

export default DynamicFriendList;