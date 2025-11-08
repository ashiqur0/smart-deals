import React from 'react';
import { use } from 'react';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to='/auth/login'></Navigate>
};

export default PrivateRoute;