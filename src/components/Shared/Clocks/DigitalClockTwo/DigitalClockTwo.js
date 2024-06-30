import React, { useState } from 'react';

const DigitalClockTwo = () => {
    	// For digital clock
    let time = new Date().toLocaleTimeString();
    
    let [ctime, setCTime] = useState();
    

	const updateTime = () => {
		time = new Date().toLocaleTimeString();
		setCTime(time);
    }
    
    setInterval(updateTime, 1000);
    

    
    return (
        <div className='bg-gradient-to-r py-3 from-indigo-500 via-purple-500 to-pink-500 border-0 text-white rounded-lg'>
        <h2> {ctime}</h2>
        </div>
    );
};

export default DigitalClockTwo;