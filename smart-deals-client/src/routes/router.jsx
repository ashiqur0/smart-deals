import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Bids from "../pages/Bids";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import MyBids from "../pages/MyBids";
import MyProducts from "../pages/MyProducts";
import AuthLayout from "../layout/AuthLayout";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/allProducts',
                element: <AllProducts />
            },
            {
                path: '/bids',
                Component: Bids
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/signup',
                Component: SignUp
            },
            {
                path: '/auth/login',
                Component: Login
            },
            {
                path: '/auth/myBids',
                element: <MyBids></MyBids>
            },
            {
                path: '/auth/myProducts',
                element: <MyProducts></MyProducts>
            },
        ]
    }
]);

export default router;