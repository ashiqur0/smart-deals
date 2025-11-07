import React from 'react';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import Product from '../components/Product';

const AllProducts = () => {
    const {allProducts } = use(AuthContext);
    console.log(allProducts);

    return (
        <div>
            <h2 className='text-3xl font-medium text-center'>All <span className='text-primary '>Products</span></h2>

            <div className='grid grid-cols-3 gap-5'>
                {
                    allProducts.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default AllProducts;