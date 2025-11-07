import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/Footer';

const AuthLayout = () => {
    const {state} = useNavigation();

    return (
        <div>
            <Navbar />

            <div className='min-h-screen'>
                {
                    state == 'loading' ? <Loading /> : <Outlet />
                }
            </div>

            <Footer />
        </div>
    );
};

export default AuthLayout;