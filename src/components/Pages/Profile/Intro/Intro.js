import React, { useContext } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthProvider';
import BigIntroModal from '../../../Modals/BigIntroModal/BigIntroModal';
import IntroUpdateModal from '../../../Modals/IntroUpdateModal/IntroUpdateModal';




const Intro = () => {
    const { logUser } = useContext(AuthContext)
    
    return (
        <div>
            
            
        <div className="Intro">
        <IntroUpdateModal />
        <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly ">
        <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
        <BigIntroModal />
            <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12">
            <h1 className='text-2xl font-serif font-semibold uppercase'>Intro</h1>
            {logUser?.intro ?
                <p className="relative px-6 py-1 text-lg italic text-center">
                <FaQuoteLeft className="w-8 h-8" />
                    
                <span className='mx-2'>{logUser?.intro.slice(0,120)}</span> {logUser?.intro.length >= 120 && <label htmlFor="Big-Intro-Modal" className='cursor-pointer text-gray-400'>more. . .</label> } 
                                
                <FaQuoteRight className='absolute right-0 w-8 h-8' />
                </p>
                :
                <p className='mt-5'>Create your new intro</p>
               }
                <label htmlFor="Update-Intro-Modal" className='mt-10 btn w-full text-xl btn-primary btn-outline'>
                E<span className='lowercase text-xl'>dit</span>
                </label>
            </div>
            </div>
        </div>
        </div> 
        </div>
    );
};

export default Intro;