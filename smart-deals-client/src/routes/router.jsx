import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Bids from "../pages/Bids";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import MyBids from "../pages/MyBids";
import MyProducts from "../pages/MyProducts";

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
            },
            {
                path: '/signup',
                Component: SignUp
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/myBids',
                element: <MyBids>

                </MyBids>
            },
            {
                path: '/myProducts',
                element: <MyProducts>
                    
                </MyProducts>
            },
        ]
    }
]);

export default router;