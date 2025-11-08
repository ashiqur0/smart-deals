import React, { use } from 'react';
import { useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'
import { useEffect } from 'react';
import { useState } from 'react';

const ProductDetails = () => {
    const product = useLoaderData();
    const [bids, setBids] = useState([]);
    const { _id: productId } = product;
    const bidModalRef = useRef(null);
    const { user } = use(AuthContext);

    // side effect: go out side of the react world
    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('bids for this product', data);
                setBids(data);
            })
    }, [productId, user])

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'
        };

        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // toast.success('Successfully place your bid!')
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    bidModalRef.current.close();

                    // Add the New Bid to state
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid].sort((a, b) => b.bid_price - a.bid_price);
                    setBids(newBids);
                }
            })
    }

    return (
        <div>
            {/* product info */}
            <div>
                <div>

                </div>

                <div>
                    <button
                        onClick={handleBidModalOpen}
                        className="btn btn-primary">I want to buy this product</button>

                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Offer something seller can not resist</p>

                            <form onSubmit={handleBidSubmit}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input
                                        type="txt"
                                        className="input"
                                        name='name'
                                        defaultValue={user?.displayName}
                                        readOnly
                                    />

                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        className="input"
                                        name='email'
                                        defaultValue={user?.email}
                                        readOnly
                                    />

                                    <label className="label">Bid</label>
                                    <input
                                        type="txt"
                                        className='input'
                                        name='bid'
                                        placeholder='Your bid'
                                    />

                                    <button type='submit' className="btn btn-neutral mt-4">Place your bid</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>

            {/* bids for this product */}
            <div>
                <h3 className='text-3xl'>Bids for this products: <span className='text-primary'>{bids.length}</span></h3>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL No.</th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bids.map((bid, index) => <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.buyer_name}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{bid.buyer_email}</td>
                                    <td>{bid.bid_price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;