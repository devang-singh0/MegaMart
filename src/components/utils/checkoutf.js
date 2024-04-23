import axios from 'axios';
import { setAlert } from '../../store/slices/alert';
export default function checkout(cart, totalPrice, user) {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/order/create`, {
            amount: Math.round(totalPrice * 100),
            receipt: 'order_id_123',
            products: Object.values(cart),
        }, { withCredentials: true })
            .then(res => {
                let options = {
                    key: 'rzp_test_6KUfJKLaEulxEx',
                    amount: res.data.amount,
                    currency: 'INR',
                    name: 'MegaMart',
                    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0xMDQsMzJINjRBMTYsMTYsMCwwLDAsNDgsNDhWMjA4YTE2LDE2LDAsMCwwLDE2LDE2aDQwYTE2LDE2LDAsMCwwLDE2LTE2VjQ4QTE2LDE2LDAsMCwwLDEwNCwzMlptMCwxNzZINjRWNDhoNDBaTTE5MiwzMkgxNTJhMTYsMTYsMCwwLDAtMTYsMTZWMjA4YTE2LDE2LDAsMCwwLDE2LDE2aDQwYTE2LDE2LDAsMCwwLDE2LTE2VjQ4QTE2LDE2LDAsMCwwLDE5MiwzMlptMCwxNzZIMTUyVjQ4aDQwWiI+PC9wYXRoPjwvc3ZnPg==',
                    order_id: res.data.id,
                    handler: function (response) {
                        axios.post(`${process.env.REACT_APP_SERVER_URL}/order/validate`, {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                        }, { withCredentials: true })
                            .then(res => {
                                resolve('success');
                            }).catch(err => {
                                reject('danger');
                            })
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phone,
                    },
                    notes: {
                        address: 'Razorpay Corporate Office',
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };
                let rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    let { description } = response.error;
                    reject(description);
                });
                rzp.open();
            }).catch(err => {
                reject(err);
            })
    });
}