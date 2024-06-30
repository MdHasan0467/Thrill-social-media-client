import React, { useContext, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill, BsGithub, BsTwitter } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthProvider';
import SocialAccounts from '../SocialAccounts/SocialAccounts';


const Login = () => {

    const [changePassword, setChangePassword] = useState(true);
    const changeIcon = changePassword === true ? false : true;

  const { logIn } = useContext(AuthContext);
  


  
    const [success, setSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState('');
  
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    //!......................................
    //!......................................
 
  
  
  
  
    //! Form Log In...
    const submitBtn = (e) => {
      e.preventDefault();
  
      setSuccess(false);
      setPasswordError('');


  
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      // console.log(email, password);
  
      logIn(email, password)
        .then((result) => {
          const user = result.user;
        // console.log(user)
          if (result) {
            setSuccess(true);
          form.reset();
          
           navigate('/')
          toast.success('Successfully login!',{
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
          }
        })
        .catch((error) => {
          console.error(error);
          setPasswordError((error.message).slice(22,36));
          if (error) {
            toast.error('Something mistakes!',{
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })
          }
        });
  };
  







  
  
    //!......................................

  if (passwordError) {
    toast.error('Something mistake here!',{
			position: "bottom-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		})
  }

  return (
    <div>
    <div className='top-content'>
    <h2 className="mb-3 text-3xl font-semibold text-center"><span className='text-red-500'>L</span><span className='text-yellow-500'>o</span><span className='text-green-500'>g</span><span className='text-blue-500'>i</span>n to your account</h2>
    <p className="text-sm text-center dark:text-gray-400">Dont have account?
        <Link to='/signup' className="focus:underline hover:underline text-blue-500"> Sign up here</Link>
    </p>
    </div>
    
      
      
      <div className='md:flex justify-evenly'>
        {/** social accounts */}
        <SocialAccounts />

        {/** Login accounts */}
      <div className="login w-full max-w-md p-4 rounded-md shadow sm:p-8 ">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-gray-200">
      <div className="card-body">
      <div className="divider">Login with email address</div>
    <form onSubmit={submitBtn}>
    <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="email" name='email' placeholder="email" className="input input-bordered" />
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="flex">
        <input type={changePassword ? "password" : "text"}
         name='password' placeholder="password" className="input w-full input-bordered" />
        <span className=" flex items-center mx-2"
        onClick={() => {
           setChangePassword(changeIcon);
        }}
     >
        {changeIcon ? <BsEyeSlashFill /> : <BsEyeFill />}
     </span>
        </div>
        <label className="label">
          <p  className="label-text-alt link link-hover hover:underline text-start">Forgot password?</p>
        </label>
      </div>
      
      <div className="form-control mt-6">
        <button className="btn bg-gradient-to-l hover:bg-gradient-to-r from-violet-500 to-fuchsia-500 border-0">Login</button>
       </div>
       
    </form>
       
    {passwordError && <p className='font-serif text-red-500'>{passwordError}</p> }
              
      
     </div>
  </div>
      </div>

      </div>


    </div>
    );
};

export default Login;