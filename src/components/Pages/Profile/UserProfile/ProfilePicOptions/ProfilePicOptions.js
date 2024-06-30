import React, { useContext } from 'react';
import { BsFillCloudArrowDownFill, BsFillExclamationDiamondFill, BsFillEyeFill } from 'react-icons/bs';
import { AuthContext } from '../../../../context/AuthProvider';
import ProfileUpdateModal from '../../../../Modals/UpdateUserModal/ProfileUpdateModal/ProfileUpdateModal';
import ProfilePhotoView from './ProfilePhotoView/ProfilePhotoView';

const ProfilePicOptions = () => {
    const { logUser } = useContext(AuthContext)




    return (
        <div>
        
        <input type="checkbox" id="Profile-Pic-Options" className="modal-toggle" />
        
        <div className="modal">
        
        {/* Modals... */}
        <ProfileUpdateModal />
        <ProfilePhotoView />
        
            <div className="modal-box w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] border-0">    
              <label htmlFor="Profile-Pic-Options" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">X</label>
              
            <div className="modal-action">
              <ul>
              <li className='my-5'>
              <label htmlFor="Profile-Photo-View" className="btn bg-green-500 hover:bg-green-600 border-0 text-white flex">
              <BsFillEyeFill className='mx-2  text-white text-xl' />
               View photo
               </label>
              </li>
              
              <li className='my-5'>
              <label htmlFor="Update-User-Profile" className="btn bg-blue-500 hover:bg-blue-600 border-0 text-white flex">
              <BsFillCloudArrowDownFill className='mx-2 text-white text-xl' /> 
              Upload Photo
              </label>
              </li>
              
              <li className='my-5'>
              <label htmlFor="Profile-Pic-Options" className="btn bg-orange-500 hover:bg-orange-600 border-0 text-white flex">
              <BsFillExclamationDiamondFill className='mx-2 text-white text-xl' />
               Learn More
               </label>
              </li>
              </ul>
            </div>

            </div>
            
            </div>
       
    </div>
    );
};

export default ProfilePicOptions;