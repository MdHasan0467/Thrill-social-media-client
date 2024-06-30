import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import LargeNavbar from '../../Shared/LargeNavbar/LargeNavbar';
import LeftSidebar from '../../Shared/LeftSidebar/LeftSidebar';
import LastUpdatedPhotos from './LastUpdatedPhotos/LastUpdatedPhotos';
import MyPostedData from './MyPostedData/MyPostedData';
import UpdateCoverPhoto from './UpdateCoverPhoto/UpdateCoverPhoto';
import UserProfile from './UserProfile/UserProfile';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import PostBox from '../Home/PostBox/PostBox';
import Intro from './Intro/Intro';
import LastUploadedFeelings from './LastUploadedFeelings/LastUploadedFeelings';
import LastUploadedStatus from './LastUploadedStatus/LastUploadedStatus';
import CoverPhoto from './CoverPhoto/CoverPhoto';
import MobileNavbar from '../../Shared/MobileNavbar/MobileNavbar';





const Profile = () => {

    const {logUser} = useContext(AuthContext)


    // console.log(logUser)




// console.log(getData)
    return (

        <div>
        <div className="cover-photo m-3">
        <CoverPhoto />
        </div>
        
                
        <div className="main">
        <div className=" py-16 mx-auto max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <UserProfile />
        </div>
        </div>
              
              
             
        <div className="grid grid-cols-1 md:grid-cols-2">
        <PostBox />
        <Intro></Intro>
        </div>


                
                
        <div className="">
        <MyPostedData />
        
        <div className="border-l border-white col-span-5">
        <div className='my-5'>
        <LastUpdatedPhotos />
        </div>
        <div className='my-5'>
        <LastUploadedStatus />
        </div>
        <div className='my-5'>
        <LastUploadedFeelings />
        </div>
        </div>
        
        </div>
        </div>
    );
};

export default Profile;