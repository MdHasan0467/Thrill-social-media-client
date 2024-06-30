import React from 'react';

const DescriptionModal = ({ descriptionModal }) => {
    // console.log(descriptionModal)
    return (
        <div>
            <input type="checkbox" id="Description-Modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
              
               
                <label htmlFor="Description-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                
                <div>
                  
                        <p className='text-white mx-10'> {descriptionModal?.description}</p>
                </div>
                
                       
              </div>
            </div>
            </div>
    );
};

export default DescriptionModal;