import React from 'react';
import LatestProducts from '../components/LatestProducts';
import { Suspense } from 'react';
import Loading from '../components/Loading';

const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json());
const Home = () => {
    return (
        <div>
            <h1>Home page</h1>
            <Suspense fallback={<Loading></Loading>}>
                <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            </Suspense>
        </div>
    );
};

export default Home;