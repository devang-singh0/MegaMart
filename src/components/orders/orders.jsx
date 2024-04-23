import { useEffect, useState } from 'react';
import './orders.scss';
import axios from '../../services/axios';
import { useSelector } from 'react-redux';

export default function Orders() {
    let user = useSelector((state) => state.user);
    let [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get(`/order`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div class="orders">
            {user?.fullName &&
                <table class="rwd-table">
                    <tbody>
                        <tr>
                            <th>SR</th>
                            <th>Payments Id</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Total Amount</th>
                        </tr>
                        {
                            orders?.length > 0 && orders.map((order, index) => {
                                return (
                                    <tr>
                                        <td data-th="SR">{index + 1}</td>
                                        <td data-th="Payments Id">{order.paymentsId}</td>
                                        <td data-th="Status">{order.status}</td>
                                        <td data-th="Created At">{new Date(order.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric'  })}</td>
                                        <td data-th="Updated At">{new Date(order.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric'  })}</td>
                                        <td data-th="Total Amount">${order?.cart?.reduce((total, item) => total + (item.price * item.quantity) + 10, 0)}</td>
                                    </tr>
                                )
                            }) || <tr><td colSpan="6">No orders found</td></tr>
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}