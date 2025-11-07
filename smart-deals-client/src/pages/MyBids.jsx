import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import Swal from 'sweetalert2';

const MyBids = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids/?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setBids(data);
                })
        }
    }, [user?.email]);

    const handleDeleteBid = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/bids/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('after delete', data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });

                            // update the state with remaining bids
                            const remainingBids = bids.filter(bid => bid._id !== _id);
                            setBids(remainingBids);
                        }
                    })
            }
        });
    }

    return (
        <div>
            <h1>My bids {bids.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SI No.</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bids.map((bid, index) => <tr key={bid._id}>
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
                                        </div>
                                    </div>
                                </td>
                                <td>{bid.buyer_email}</td>
                                <td>{bid.bid_price}</td>
                                <th><div className={`badge badge-${bid.status === 'pending' ? 'warning' : 'success'}`}>{bid.status}</div></th>
                                <td><button
                                    onClick={() => handleDeleteBid(bid._id)}
                                    className='btn btn-outline btn-xs'
                                >Remove Bid</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;