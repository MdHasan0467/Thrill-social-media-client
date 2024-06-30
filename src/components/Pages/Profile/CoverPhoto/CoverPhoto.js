import React, { useContext } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { AuthContext } from '../../../context/AuthProvider';
import UpdateCoverPhoto from '../UpdateCoverPhoto/UpdateCoverPhoto';

const CoverPhoto = () => {

    const {logUser} = useContext(AuthContext)


    return (
        <>
               {/*
       <div>
          
            
                        
        <PhotoProvider>
         <PhotoView src={logUser?.coverPhoto}r>
         <img title='View Now' className='cursor-pointer w-[100vw] h-[60vh] object-cover object-center' src={logUser?.coverPhoto} alt="Cover" />
         </PhotoView>
         </PhotoProvider>
        
        <label htmlFor="Update-Cover-Photo"  className='btn btn-primary btn-outline mt-5'>Update Cover Photo</label>
        </div>
    */}
        
        
    <div className="relative">
    <UpdateCoverPhoto></UpdateCoverPhoto> 
    {logUser?.coverPhoto ? (
      <img
        className="w-full lg:h-[350px] md:h-[300px] h-[200px] rounded-md"
        src={logUser?.coverPhoto}
        alt="Cover Photo"
      />
    ) : (
      <div className="relative bg-gradient-to-r py-3 from-indigo-500 via-purple-500 to-pink-500 border-0 text-white lg:h-[350px] md:h-[300px] h-[200px] flex justify-center items-center">
        <h4 className="text-[#fff] font-semibold lg:text-5xl md:text-3xl">
          Add your cover photo
        </h4>
      </div>
    )}

    <label
      htmlFor="Update-Cover-Photo"
      className=" inline-block absolute bottom-3 right-0 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-2 md:px-4 py-1 md:py-[6px] mr-4 rounded-md "
    >
    <AiFillCamera className="inline-block text-xl  mr-1" />
    Edit cover photo
    </label>
  </div>
        </>
    );
};

export default CoverPhoto;