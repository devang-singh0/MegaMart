import './basket.scss'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, emptyCart } from '../../store/slices/cart'
import { Trash, CaretDown, Plus, Minus } from "phosphor-react"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { setAlert } from '../../store/slices/alert'
import checkout from '../utils/checkoutf'
export default function Basket() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    let total = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    let shippingCharges = Object.keys(cart).length * 10;
    let goToCheckout = async () => {
        if (user?.fullName && Object.keys(cart).length > 0) {
            checkout(cart, total + shippingCharges, user)
                .then(result => {
                    setAlert({ data: 'Payment Successful', type: 'success' })
                    dispatch(emptyCart());
                })
                .catch(error => {
                    setAlert({ data: 'Payment Failed', type: 'danger' })
                })
        }
        !user?.fullName && navigate('/user') && dispatch(setAlert({ data: 'Please login to continue', type: 'danger' }));
        Object.keys(cart).length === 0 && dispatch(setAlert({ data: 'Cart is empty', type: 'danger' }));
    }
    return (
        <div id="basket">
            <h1>Shopping Cart</h1>
            <div className="container">
                <div className="cart">
                    <h2>Cart ({Object.keys(cart).length} item/s)</h2>
                    {Object.values(cart).map((e, i) => (
                        <>
                            <Item key={i} data={e} />
                            {i !== Object.values(cart).length - 1 && <hr />}
                        </>
                    ))}
                </div>
                <div className="total">
                    <div className="checkout">
                        <h2>The total Amount</h2>
                        <p><span>Products Total</span> <span>${total}</span></p>
                        <p><span>Shipping Charges</span> <span>${shippingCharges}</span></p>
                        <hr />
                        <h4><span>Final Amount (including GST)</span> <span>${total + shippingCharges}</span></h4>
                        <button onClick={goToCheckout}>Go to Checkout</button>
                    </div>
                    <div className="coupon">
                        <span>Add a discount coupon</span>
                        <span><CaretDown /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Item({ data }) {
    const dispatch = useDispatch();
    let [state, setState] = useState(data.quantity);
    const handleRemove = (id) => {
        dispatch(removeFromCart({ id }))
    }
    const handleUpdate = (id, i) => {
        let newState = state;
        if (state > 1 && i == -1) {
            newState = state + i;
        } else if (i == 1) {
            newState = state + i;
        }
        setState(newState);
        dispatch(updateQuantity({ id, quantity: newState }))
    }
    return (
        <div className="item">
            <img src={data.img} alt="" />
            <div className="data">
                <h3>{data.name}</h3>
                <p>Quantity : <span>x{data.quantity}</span></p>
                <p>Brand : <span>Apple</span></p>
                <p>Price per Unit : <span>${data.price}</span></p>
                <button onClick={() => handleRemove(data.id)}><Trash />Remove Item</button>
            </div>
            <div className="amount">
                <div>
                    <button onClick={() => handleUpdate(data.id, -1)}><Minus /></button>
                    <input type="number" value={state} />
                    <button onClick={() => handleUpdate(data.id, 1)}><Plus /></button>
                </div>
                <p>${data.price * data.quantity}</p>
            </div>
        </div>
    )
}