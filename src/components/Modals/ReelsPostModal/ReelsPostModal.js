import React from 'react';

const ReelsPostModal = () => {
    return (
        <div>

        <input type="checkbox" id="Reels-Post-Modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 ">
		  
			<h1 className='bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] border-0 mx-10 text-white py-2 rounded-t-lg'>Create a new post</h1>
            <label htmlFor="Reels-Post-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            
             
                    
          </div>
        </div>
        </div>
    );
};

export default ReelsPostModal;