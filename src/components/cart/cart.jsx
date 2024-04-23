import { useNavigate } from 'react-router-dom';
import './cart.scss'
import { useSelector } from 'react-redux'

export default function Cart() {
    let cart = useSelector(state => state.cart);
    let navigate = useNavigate();
    return (
        <div id="cart">
            {Object.keys(cart).length > 0 ? (
                <>
                    <div className="cartItems">
                        {Object.values(cart).map((e, i) => <CartItem key={i} data={e} />)}
                    </div>
                    <div><button onClick={() => navigate('/cart')}>Go to Cart</button></div>
                </>
            ) : (
                <div style={{textAlign: 'center'}}>
                    Cart is Empty
                </div>
            )}
        </div>
    )
}

function CartItem({ data }) {
    let navigate = useNavigate();
    function click() {
        navigate(`/product/${data._id}`);
    }
    return (
        <div className="cartItem" onClick={click}>
            <img src={data.img} alt="product" />
            <div>
                <h4>{data.name}</h4>
                <p>${data.price}</p>
            </div>
            <p>x{data.quantity}</p>
        </div>
    )
}