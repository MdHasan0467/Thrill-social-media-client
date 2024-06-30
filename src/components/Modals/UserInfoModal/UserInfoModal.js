import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const UserInfoModal = () => {
  const {logUser} = useContext(AuthContext)

  
  // function refreshPage() {
  //   window.location.reload(false);
  // }


    return (
        <div>
            <input type="checkbox" id="User-Info-Modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
              
               
                <label htmlFor="User-Info-Modal"  className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                
                <div className="flex justify-center">
                <h1 className='text-2xl text-white'>User Info</h1>
                <div className="avatar placeholder mx-2">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <img src={logUser?.image} alt="" />
                </div>
              </div>
                </div>
                
                <p className='text-start text-white'>{logUser?.name}</p>
                <p className='text-start text-white'>{logUser?.email}</p>
                <p className='text-start text-white'>{logUser?.phoneNumber}</p>
                
                <ul className="steps steps-vertical">
                <li className="step step-primary text-white "> প্রোফাইলের সবগুলো সেকশন খুব মনোযোগ দিয়ে চেক করে ফেলো।  </li>
                <li className="step step-primary text-white "> প্রোফাইলের সবগুলো সেকশন খুব মনোযোগ দিয়ে চেক করে ফেলো।  </li>
                <li className="step step-primary text-white "> সব ইনফরমেশন গুলো অবশ্যই ভ্যালিড হতে হবে, যদি কোন অসঙ্গতি পাওয়া যায় তাহলে জবপ্লেসমেন্টের জন্য আর তোমার প্রোফাইল দেখা হবে না।</li>
                <li className="step text-white "> মেইন কোর্স শেষ করার পর তোমার তুমি সব গুলো ইনফরমেশন ফিলাপ করে জবপ্লেসমেন্ট পোর্টালের জন্য অ্যাপলাই করতে পারবা, তোমার প্রোফাইল ১০০% হলে এবং মেইন কোর্স শেষ করলে অ্যাপলাই বাটন দেখতে পাবে। </li>
                <li className="step text-white "> তোমার প্রোফাইল জবপ্লেসমেন্ট পোর্টালে আপ্রুভ হলে, জবপ্লেসমেন্ট ম্যানেজাররা তোমার প্রোফাইল নিয়ে কাজ করবে।</li>
                <li className="step text-white "> যে কোন কোম্পানিতে তোমার যদি আইটি সংক্রান্ত কাজের পূর্বঅভিজ্ঞতা থাকে তাহলে অবশ্যই জব এক্সপেরিয়েন্স-এ অ্যাড করে ফেলো।</li>
              </ul>
                   
              </div>
            </div>
        </div>
    );
};

export default UserInfoModal;