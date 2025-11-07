import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';

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
    }, [user?.email])

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
                            <th>Details</th>
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
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;