import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Product = ({ product }) => {
    const {user} = use(AuthContext);
    const { _id, title, price_min, price_max, image } = product;

    return (
        <div className="card bg-base-100 w-full shadow-md p-4 flex flex-col justify-between">
            <figure className="">
                <img
                    src={image}
                    alt="Shoes"
                    className="rounded-xl w-full h-55 overflow-hidden" />
            </figure>

            <div className="space-y-3 mt-5">
                <h2 className="card-title">{title}</h2>
                <p>${price_min}-{price_max}</p>
                <div className="card-actions ">
                    <Link to={`${user? `/auth/productDetails/${_id}`:'/auth/login'}`} className='btn btn-primary w-full'>View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;