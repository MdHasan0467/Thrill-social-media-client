import React, { useContext } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { AuthContext } from '../../../../../context/AuthProvider';

const ProfilePhotoView = () => {
    const { logUser } = useContext(AuthContext)




    return (
        <div>
            <input type="checkbox" id="Profile-Photo-View" className="modal-toggle" />
            <div className="modal">
            <label htmlFor="Profile-Photo-View" title='close' className="btn btn-sm btn-error btn-circle absolute right-2 top-2">X</label>
            <PhotoProvider>
            <PhotoView src={logUser?.image}r>
            <img title='Click here' src={logUser?.image} alt="profile" className="cursor-pointer w-[100vw] [100vh] mx-auto object-contain" />
            </PhotoView>
            </PhotoProvider>
            </div>
        </div>
    );
};

export default ProfilePhotoView;