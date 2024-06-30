import React from 'react';
import Carousel from './Carousel/Carousel';

const Stories = () => {
    return (
        <div className='card w-[480px] rounded-md bg-base-100 shadow-xl'>
            <h1 className='pt-2 font-semibold'>Share your special memories (Reels)</h1>
            <Carousel />
        </div>
    );
};

export default Stories;