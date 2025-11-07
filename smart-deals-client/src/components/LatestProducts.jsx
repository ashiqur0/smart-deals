import React from 'react';
import { use } from 'react';
import Product from './Product';

const LatestProducts = ({ latestProductsPromise }) => {
    const products = use(latestProductsPromise);
    console.log(products);

    return (
        <div>
            <h2 className='text-3xl font-medium text-center'>Recent <span className='text-primary '>Products</span></h2>

            <div className='grid grid-cols-3 gap-5'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;