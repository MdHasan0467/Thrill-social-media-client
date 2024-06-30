import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	
	if (loading) {
		return <progress className='progress progress-error w-56'></progress>;
	}

		if (user && user.uid) {
			return children;
		}
		return <Navigate to='/login' state={{ from: location }} replace > </Navigate>
      
};

export default PrivateRoute;