import React, { useContext, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill, BsFacebook, BsGithub, BsInfoCircle, BsInfoCircleFill, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaStreetView } from 'react-icons/fa';
import { GrDocumentUpdate} from 'react-icons/gr';
import { AiFillEdit, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import EmailUpdateModal from '../../../Modals/UpdateUserModal/EmailUpdateModal/EmailUpdateModal';
import NameUpdateModal from '../../../Modals/UpdateUserModal/NameUpdateModal/NameUpdateModal';
import PhoneNumberUpdateModal from '../../../Modals/UpdateUserModal/PhoneNumberUpdateModal/PhoneNumberUpdateModal';
import UserInfoModal from '../../../Modals/UserInfoModal/UserInfoModal';
import ProfilePicOptions from './ProfilePicOptions/ProfilePicOptions';
import UpdateUserSocialAccounts from '../../../Modals/UpdateUserSocialAccounts/UpdateUserSocialAccounts';





const UserProfile = () => {
	const { logUser } = useContext(AuthContext)
	// console.log('logUser', logUser)
	

	const [changePassword, setChangePassword] = useState(true);
	const changeIcon = changePassword === true ? false : true;
	



    return (
        <div className="profile">
		<UserInfoModal />
		
        <div className="flex bg-slate-50 flex-col justify-center p-6 shadow-md rounded-xl sm:px-12">
		<label htmlFor="User-Info-Modal" title='User info' className="User-Info group w-10 cursor-pointer">
		<BsInfoCircle className='group-hover:hidden inline' />
		<BsInfoCircleFill className='group-hover:inline hidden' />
		</label>
		
					
		{/* Update User Profile */}
	    
	    <ProfilePicOptions />
		
		<div className="flex">
		<label htmlFor="Profile-Pic-Options" className='w-32 mx-auto '>
		{logUser?.image ?
		<img title='View Now' src={logUser?.image} alt="profile" className="cursor-pointer w-32 h-32 mx-auto rounded-full aspect-square" />
		
		
		:
		
		<img
		className="lg:h-28 lg:w-28 md:h-24 md:w-24 w-14 h-14 rounded-full"
		src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkA7r1pd3h80Lq9uOByb2ALq5FoOAe-Mq0j3_EZzmOo4tXO0CUkRHQrbXMruyClSGA87E&usqp=CAU"
		alt=""
	  />
		
		}
		</label>
		
		<Link to={`/others/${logUser?.email}`} className='btn btn-primary mt-5 flex'>
		<FaStreetView className='mx-2'/>  View As
	   </Link>
		</div>
		
		


		{/* ================ */}
					
	     <div className="space-y-4 text-center divide-y divide-gray-700">
		 
		<div className="my-2 space-y-1">
		
		{/* Update User Name */}
		<NameUpdateModal />
		<div className="grid grid-cols-12 pt-5">
		<h2 className="text-start text-xl font-semibold sm:text-2xl col-span-10">{logUser?.name}</h2>
		
		<label htmlFor="Update-User-Name" title='Update name' className='items-center flex ml-5 col-span-2 hover:underline cursor-pointer group '>
		<div className="flex items-center group-hover:hidden ">
		<AiOutlineEdit className=' border  border-gray-400 rounded-full ' /> 
		<span className='mx-2'>Edit</span>
		</div>
		<div className=" items-center group-hover:flex hidden">
		<AiFillEdit className=' border border-gray-400 rounded-full ' />
		<span className='mx-2'>Edit</span>
		</div>
		</label>
		</div>
		{/* ================ */}
							
						
		{/* Update User Email */}
		<EmailUpdateModal />
		<div className="grid grid-cols-12 pt-5">
		<p className="text-start text-xs sm:text-base col-span-10">Email : {logUser?.email}</p>
	
		<label htmlFor="Update-User-Email" title='Update email' className='items-center flex ml-5 col-span-2 hover:underline cursor-pointer group '>
		<div className="flex items-center group-hover:hidden ">
		<AiOutlineEdit className=' border  border-gray-400 rounded-full ' /> 
		<span className='mx-2'>Edit</span>
		</div>
		<div className=" items-center group-hover:flex hidden">
		<AiFillEdit className=' border border-gray-400 rounded-full ' />
		<span className='mx-2'>Edit</span>
		</div>
		</label>
		</div>
		{/* ================ */}
			
			
		{/* Update User Phone Number */}
		<PhoneNumberUpdateModal />
		<div className="grid grid-cols-12 pt-5">
		<p className="text-start text-xs sm:text-base col-span-10">Phone : {logUser?.phoneNumber}</p>
		
		<label htmlFor="Update-User-phoneNumber" title='Update number' className='items-center flex ml-5 col-span-2 hover:underline cursor-pointer group '>
		<div className="flex items-center group-hover:hidden ">
		<AiOutlineEdit className=' border  border-gray-400 rounded-full ' /> 
		<span className='mx-2'>Edit</span>
		</div>
		<div className=" items-center group-hover:flex hidden">
		<AiFillEdit className=' border border-gray-400 rounded-full ' />
		<span className='mx-2'>Edit</span>
		</div>
		</label>
		</div>
		{/* ================ */}
			
		
			
		<div className="flex text-start pt-5">
		<h1 className=' text-start'>Password :-</h1>
		
		<input type={changePassword ? "password" : "text"}
		defaultValue={logUser?.password} readOnly className="w-16 mx-2" />
		
		<span className="flex items-center mx-2 cursor-pointer"
		onClick={() => { setChangePassword(changeIcon)}}
		 >
		{changeIcon ? <BsEyeSlashFill /> : <BsEyeFill />}
		 </span>
		</div>
		
						
		</div>
		
					
					
		<div className="flex justify-between">
			<div className="flex pt-2 space-x-4 align-center">
			<a rel="noopener noreferrer" target={'_blank'} href={logUser?.githubURL}  aria-label="GitHub" className="p-2 rounded-md cursor-pointer">
				<BsGithub />
			</a>
			<a rel="noopener noreferrer" target={'_blank'} href={logUser?.facebookURL} aria-label="Facebook" className="p-2 rounded-md cursor-pointer">
				<BsFacebook />
			</a>
			<a rel="noopener noreferrer" target={'_blank'} href={logUser?.twitterURL} aria-label="Twitter" className="p-2 rounded-md cursor-pointer">
				<BsTwitter />
			</a>
			<a rel="noopener noreferrer" target={'_blank'} href={logUser?.linkedinURL} aria-label="Linkedin" className="p-2 rounded-md cursor-pointer">
				<BsLinkedin />
			</a>
			</div>
				
			<UpdateUserSocialAccounts user = {logUser} />
			<label htmlFor='Update-User-Social-Accounts' title='Edit Social Accounts' className="p-2 cursor-pointer rounded-md flex justify-end">
				<GrDocumentUpdate />
			</label>
		</div>
		
					
	     </div>
	
         </div>
        
        </div>
    );
};

export default UserProfile;







