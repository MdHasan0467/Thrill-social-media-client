import React, { useContext } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiChat, BiGitPullRequest, BiLoader, BiMenuAltLeft } from 'react-icons/bi';
import { BsFillChatSquareQuoteFill, BsFillMenuButtonWideFill, BsFillPersonLinesFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { ImMenu4 } from 'react-icons/im';
import { FcAbout, FcTimeline } from 'react-icons/fc';
import { GiEntryDoor, GiShinyApple } from 'react-icons/gi';
import { RiAdvertisementLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';

const MobileNavbar = () => {
  
    
 
  const { logUser, logOut} = useContext(AuthContext)

  const navigate = useNavigate()


  const handleLogOut = () => {
    logOut()
    navigate('/login')
    toast.error('Log out Successful')

  }





  function refreshPage() {
    window.location.reload(false);
  }





    return (
        <div>
        <div className="btm-nav grid grid-cols-3">
          
        <button className="active flex justify-center bg-blue-200 text-blue-600 col-span-1 dropdown dropdown-top">
        <label tabIndex={0} className="">
        <BiMenuAltLeft className='text-2xl text-blue-800 ' />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 ml-10 shadow bg-blue-700 rounded-box w-52">
        
        <li>
        <Link to='/others/chat'>
        <a rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md ">
        <BiChat></BiChat>
        <span>Chat</span>
        </a>
        </Link>
        </li>
              
        <li>
          <Link to='/others/stop-watch'>
          <a rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md ">
          <FcTimeline></FcTimeline>
          <span>Stop Watch</span>
          </a>
          </Link>
        </li>

          <li>
          <Link to='/others/quotes'>
          <a rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md  ">
          <BsFillChatSquareQuoteFill className='text-teal-600'></BsFillChatSquareQuoteFill>
          <span>New Quotes</span>
          </a>
          </Link>
        </li>

                        

        <li className=""> 
        <Link to='/others/friends'>
        <a rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md ">
        <FaUserFriends className='text-pink-500'></FaUserFriends>
        <span>All User</span>
        </a>
        </Link>
        </li>
              

            
        <li className=""> 
        <Link to={`/others/Dynamic-Friend-Request-List/${logUser?.email}`}>
        <a rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md ">
        <BiGitPullRequest className='text-pink-500'></BiGitPullRequest>
        <span>Friend Request</span>
        </a>
        </Link>
        </li>
        
        

        
        <li className=""> 
        <Link to={`/profile/Dynamic-Friend-List/${logUser?.email}`}>
        <a rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md ">
        <BsFillPersonLinesFill className='text-pink-500'></BsFillPersonLinesFill>
        <span>Friend</span>
        </a>
        </Link>
        </li>
                

        <li>
        <Link to='/others/adCenter'>
        <a rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md ">
        <RiAdvertisementLine className='text-indigo-500 '></RiAdvertisementLine>
        <span>Ad Center</span>
        </a>
        </Link>
        </li> 

        <li className='ml-3'>
        <a rel="noopener noreferrer" href="https://food-court-7b95a.web.app/" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md ">
        <GiShinyApple className='text-green-500'></GiShinyApple>
        <span>Food Court</span>
        </a>
        </li> 



        <li>
        <Link to='/others/about-us'>
        <a rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg p-2 space-x-3 rounded-md ">
        <FcAbout className='text-green-500'></FcAbout>
        <span>About Us</span>
        </a>
        </Link>
        </li> 




            <li>
            <Link to='/login'>
            <a onClick={handleLogOut} rel="noopener noreferrer" href="#" className="flex text-white text-start font-semibold text-lg hover:text-red-500 p-2 space-x-3 rounded-md ">
            <GiEntryDoor className='text-white'></GiEntryDoor>
            <span>Logout</span>
            </a>
            </Link>
            </li> 
        </ul>
        </button>

          
        <button className="active bg-pink-200 text-pink-600 col-span-1">
          <Link to='/'>
          <AiOutlineHome className='text-2xl' />
          </Link>
        </button>

          

        <button onClick={refreshPage} className="active bg-teal-200 text-teal-600 col-span-1">
        <BiLoader className='text-2xl' />
        </button>
      </div>
        </div>
    );
};

export default MobileNavbar;