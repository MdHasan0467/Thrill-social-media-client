import React from 'react';
import Clock from 'react-live-clock';

const Clocks = () => {


    
    return (
        <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white rounded-lg'>
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'GMT +6'} />
        
        </div>
    );
};

export default Clocks;