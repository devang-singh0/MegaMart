import axios from "../../services/axios";
export default function checkout(cart, totalPrice, user) {
    return new Promise((resolve, reject) => {
        axios.post(`/order/create`, {
            amount: Math.round(totalPrice * 100),
            receipt: 'order_id_123',
            products: Object.values(cart),
        }).then(res => {
            let options = {
                key: '',
                amount: res.data.amount,
                currency: 'INR',
                name: 'MegaMart',
                image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0xMDQsMzJINjRBMTYsMTYsMCwwLDAsNDgsNDhWMjA4YTE2LDE2LDAsMCwwLDE2LDE2aDQwYTE2LDE2LDAsMCwwLDE2LTE2VjQ4QTE2LDE2LDAsMCwwLDEwNCwzMlptMCwxNzZINjRWNDhoNDBaTTE5MiwzMkgxNTJhMTYsMTYsMCwwLDAtMTYsMTZWMjA4YTE2LDE2LDAsMCwwLDE2LDE2aDQwYTE2LDE2LDAsMCwwLDE2LTE2VjQ4QTE2LDE2LDAsMCwwLDE5MiwzMlptMCwxNzZIMTUyVjQ4aDQwWiI+PC9wYXRoPjwvc3ZnPg==',
                order_id: res.data.orderId,
                handler: function (response) {
                    axios.post(`/order/validate`, {
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                    }).then(res => {
                        resolve('success');
                    }).catch(err => {
                        reject(err);
                    })
                },
                theme: {
                    color: '#008ecc',
                },

            };
            let rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                let { error } = response;
                reject(error);
            });
            rzp.open();
        }).catch(err => {
            reject(err);
        })
    });
}