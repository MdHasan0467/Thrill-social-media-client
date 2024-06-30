import React from 'react';
import { BiPauseCircle } from 'react-icons/bi';
import { BsAlarm, BsAlarmFill, BsExclude, BsFillHandIndexThumbFill, BsPlayCircle } from 'react-icons/bs';
import { useTimer } from 'react-timer-hook';
import TimezonePicker from 'react-timezone';


const StopWatch = () => {


    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ onExpire: () => console.warn('onExpire called') })
    


      //!time zone
  // {
  //   name: string,
  //   label: string,
  //   offset: number,
  // }

    return (
        <div>
        <div style={{textAlign: 'center'}}>
        <h1 className='hidden'>react-timer-hook </h1>
        
                
                
        <div className="flex w-96 mx-auto my-10">
        <p className='text-2xl'>Restarts to 5 minutes timer</p>
        <button title='Reset' onClick= {() => {
            // Restarts to 5 minutes timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            restart(time)
          }}>
          <BsAlarm className='mx-10 text-blue-600'></BsAlarm>
          </button>
        </div>
        
                
                
                
                <div className='bg-blue-100 w-96 mx-auto rounded-full' style={{ fontSize: '100px' }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p>{isRunning ? 'Running' : 'Not running'}</p>
        <p className='my-5'>
            {seconds ?
              <>
                {isRunning ?
                  <button title='Pause' onClick={pause}><BiPauseCircle className='mx-10 text-5xl text-red-600'></BiPauseCircle></button>
                  :
                  <button title='Play' onClick={start}><BsPlayCircle className='mx-10 text-4xl text-green-600'></BsPlayCircle></button>
                }
              </>
              :
              <button title='Start' onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300);
                restart(time)
              }}>
                <BsFillHandIndexThumbFill className='mx-10 text-blue-600'></BsFillHandIndexThumbFill>
              </button>
            }
        </p>
        

                

      </div>



        <div className="mt-32">
                {/** Time Zone Select */}
        
                <TimezonePicker
                className='w-96'
                value="Asia/Dhaka"
              onChange={timezone => console.log('New Timezone Selected:', timezone)}
              inputProps={{
                placeholder: 'Select Timezone...',
                name: 'timezone',
              }}
            />
        </div>



        </div>
    );
};

export default StopWatch;