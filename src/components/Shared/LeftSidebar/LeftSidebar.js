import React, { useContext } from 'react';
import { BsFillChatSquareQuoteFill, BsFillFileEarmarkPostFill, BsFillPersonLinesFill, BsFillSuitHeartFill, BsSearch } from 'react-icons/bs';       
import { RiAdvertisementLine } from 'react-icons/ri';       
import { BiChat, BiGitPullRequest, BiLoaderCircle } from 'react-icons/bi';       
import { GiEntryDoor, GiShinyApple } from 'react-icons/gi';       
import { AiFillSetting, AiOutlineUserAdd } from 'react-icons/ai';       
import { MdSell } from 'react-icons/md';       
import { FaObjectGroup, FaUserFriends,  } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/SmartThrillLogo.png';
// import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../context/AuthProvider';
import { FcAbout, FcTimeline } from 'react-icons/fc';
import DigitalClockTwo from '../Clocks/DigitalClockTwo/DigitalClockTwo';
import { toast } from 'react-toastify';




const LeftSidebar = () => {

 
    const {user, logUser, logOut} = useContext(AuthContext)

    const navigate = useNavigate()
  
  
    const handleLogOut = () => {
      logOut()
      navigate('/login')
      toast.error('Log out Successful')
  
    }
  
  

    return (
        <div className='font-semibold text-2xl'>
        <div className="h-full p-3 space-y-2 w-60 ">
        {/* Logo */}
        {/* <Link to='/'>
        <img className='w-fill h-16' src={logo} alt="logo" />
        </Link> */}

        
              
        {/* User Profile Box */}  
        {
         logUser && 
         
        <div className="flex items-center p-2 pt-3 bg-blue-700 text-white rounded-md shadow-lg space-x-4">
        {logUser?.image?
        <Link title='Profile' to='/profile' className="avatar cursor-pointer online">
        <div className="w-12 h-12 rounded-full hover:ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={logUser?.image} />
        </div>
       </Link>
       :
       <img
       className="w-12 h-12 rounded-full"
       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkA7r1pd3h80Lq9uOByb2ALq5FoOAe-Mq0j3_EZzmOo4tXO0CUkRHQrbXMruyClSGA87E&usqp=CAU"
       alt=""
       />
        }
            <div>
            {logUser?.name?.length <= 8 && 
            <h2 className="text-lg font-semibold">{logUser?.name?.slice(0, 8)}</h2>
            }
            { logUser?.name?.length >=9 &&
                 <h2 className="text-lg font-semibold">{logUser?.name?.slice(0, 8)} . . .</h2>
            }
                <span className="flex items-center space-x-1">
                    <Link to='/profile' className="text-xs hover:underline">View profile</Link>
                </span>
            </div>
        </div>
        
        }
        
        
        {/* For digital clock */}
        <div className='pt-3'>
        <DigitalClockTwo></DigitalClockTwo>
        </div>
        
        {/* Menu Links */}        
        <div className="divide-y divide-gray-700">
            <ul className="pt-2 pb-4 mt-16 space-y-1 text-sm">
            <li>
            <Link to='/others/chat'>
            <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
            <BiChat></BiChat>
            <span>Chat</span>
            </a>
            </Link>
         </li>


                        
            <li>
            <Link to='/others/stop-watch'>
            <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
            <FcTimeline></FcTimeline>
            <span>Stop Watch</span>
            </a>
            </Link>
         </li>

            
            <li>
            <Link to='/others/quotes'>
            <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100 ">
            <BsFillChatSquareQuoteFill className='text-teal-600'></BsFillChatSquareQuoteFill>
            <span>New Quotes</span>
            </a>
            </Link>
         </li>

            
            <li className=""> 
            <Link to='/others/friends'>
            <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
            <AiOutlineUserAdd className='text-pink-500'></AiOutlineUserAdd>
            <span>All User</span>
            </a>
            </Link>
            </li>
            

            
            <li className=""> 
            <Link to={`/others/Dynamic-Friend-Request-List/${logUser?.email}`}>
            <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
            <FaUserFriends className='text-pink-500'></FaUserFriends>
            <span>Friend Request</span>
            </a>
            </Link>
            </li>
            
            

            
            <li className=""> 
            <Link to={`/profile/Dynamic-Friend-List/${logUser?.email}`}>
            <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
            <BsFillPersonLinesFill className='text-pink-500'></BsFillPersonLinesFill>
            <span>Friend List</span>
            </a>
            </Link>
            </li>
            
                        
                        
                        
            <li>
            <Link to='/others/adCenter'>
            <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
            <RiAdvertisementLine className='text-indigo-500'></RiAdvertisementLine>
            <span>Ad Center</span>
            </a>
            </Link>
            </li>


            
                        
                        
                        
            <li>
            <Link to='/others/circularSliders'>
            <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
            <BiLoaderCircle className='text-green-400'></BiLoaderCircle>
            <span>Watch Slider</span>
            </a>
            </Link>
            </li>



            </ul>
        </div>
        </div>
            
            {/* Down Part */}



            <div className="divide-y divide-gray-700 p-3">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
 
            <li>
            <a target='_blank' rel="noopener noreferrer" href="https://food-court-7b95a.web.app/" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
                <GiShinyApple className='text-green-500'></GiShinyApple>
                <span>Food Court Restaurant</span>
            </a>
            </li>
                
                    
            <li>
             <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
                    <BsFillFileEarmarkPostFill className='text-orange-400'></BsFillFileEarmarkPostFill>
                    <span>Most Recent</span>
            </a>
            </li>
       
                    


                    
             <li>
                    <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
                        <FaObjectGroup className='text-fuchsia-700'></FaObjectGroup>
                        <span>Groups</span>
                    </a>
             </li>
             
                    
             <li>
                <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
                    <MdSell className='text-yellow-500'></MdSell>
                    <span>Orders</span>
                </a>
             </li>
             
                    
             <li>
                <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
                    <BsFillSuitHeartFill className='text-lime-500'></BsFillSuitHeartFill>
                    <span>Wishlist</span>
                </a>
             </li>

            </ul>
            <ul className="pt-4 pb-2 space-y-1 text-sm">
              <li>
                    <a rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
                        <AiFillSetting></AiFillSetting>
                        <span>Settings</span>
                    </a>
               </li>
               
                    
              <li>
                    <Link to='/others/about-us' className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100">
                        <FcAbout />
                        <span>About Us</span>
                    </Link>
               </li>
               
                    
               <li>
                    <a onClick={handleLogOut} rel="noopener noreferrer" href="#" className="flex  items-center font-semibold text-xl p-2 space-x-3 rounded-md hover:bg-base-100 hover:text-red-500">
                        <GiEntryDoor></GiEntryDoor>
                        <span>Logout</span>
                    </a>
                </li>
                
            </ul>
        </div>
     
        </div>
    );
};

export default LeftSidebar;