import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
    const { _id, title, price_min, price_max, image } = product;

    return (
        <div className="card bg-base-100 w-full shadow-md p-4">
            <figure className="">
                <img
                    src={image}
                    alt="Shoes"
                    className="rounded-xl w-full h-55 overflow-hidden" />
            </figure>

            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>${price_min}-{price_max}</p>
                <div className="card-actions ">
                    <Link to={`/auth/productDetails/${_id}`} className='btn btn-primary w-full'>View Details</Link>
                </div>
            </div>

            {/* <div className='space-y-2 w-full'>
                <h2 className='text-xl font-semibold mt-5'>{title}</h2>
                <p className='text-primary text-[18px] text-semibold'>${price_min}-{price_max}</p>
                <button className='btn btn-gradient w-full'>View Details</button>
            </div> */}
        </div>
    );
};

export default Product;