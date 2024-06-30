import React, { useContext } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthProvider';

const BigIntroModal = () => {
  const { logUser } = useContext(AuthContext)
  
  
  // function refreshPage() {
  //   window.location.reload(false);
  // }
    return (
        <div>
        
            <input type="checkbox" id="Big-Intro-Modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
              
               
                <label htmlFor="Big-Intro-Modal"  className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                
                <div>
                {logUser?.intro &&
                    <p className="relative px-6 py-1 text-white text-lg italic text-center">
                    <FaQuoteLeft className="w-8 h-8" />
                        
                    <span className='mx-2'>{logUser?.intro}</span> 
                                    
                    <FaQuoteRight className='absolute right-0 w-8 h-8' />
                    </p>
                    }
                </div>
                
                       
              </div>
            </div>
        </div>
    );
};

export default BigIntroModal;