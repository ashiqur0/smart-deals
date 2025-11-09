import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const CreateAProduct = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const handleCreateAProduct = (e) => {
        e.preventDefault();

        const title = e.target.name.value;
        const image = e.target.image.value;
        const price_min = e.target.min_price.value;
        const price_max = e.target.max_price.value;
        const newProduct = {
            title, image, price_min, price_max,
            email: user.email,
            seller_name: user.displayName,
        };

        // data posting using Axios Instance React Custom Hook
        axiosInstance.post('/products', newProduct)
            .then(data => {
                console.log(data.data);

                if (data.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        // // console.log(newProduct);
        // axios.post(`http://localhost:3000/products`, newProduct)
        //     .then(data => {
        //         console.log(data.data);

        //         if (data.data.insertedId) {
        //             Swal.fire({
        //                 position: "center",
        //                 icon: "success",
        //                 title: "Your bid has been placed",
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //         }
        //     })
    }

    return (
        <div className='w-75 mx-auto'>
            <h2 className='mt-5 text-primary text-2xl font-semibold'>Create A Product</h2>
            <form onSubmit={handleCreateAProduct}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input
                        type="txt"
                        className="input"
                        name='name'
                    />

                    <label className="label">Image</label>
                    <input
                        type="txt"
                        className="input"
                        name='image'
                    />

                    <label className="label">Minimum Price</label>
                    <input
                        type="txt"
                        className='input'
                        name='min_price'
                    />

                    <label className="label">Maximum Price</label>
                    <input
                        type="txt"
                        className='input'
                        name='max_price'
                    />

                    <button type='submit' className="btn btn-neutral mt-4">Place your bid</button>
                </fieldset>
            </form>
        </div>
    );
};

export default CreateAProduct;