import './product.scss'
import { useEffect, useState } from 'react';
import { ReactComponent as StarSVG } from '../svg/star.svg';
import { useParams } from 'react-router-dom';
import axios from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../../store/slices/cart';
export default function Product() {
    let [state, setState] = useState({ slider: 0, productImgUrl: '', itemCount: 1, product: {} });
    let { id } = useParams();
    let cart = useSelector(state => state.cart);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`/product/id/${id}`)
            .then(res => {
                setState({ ...state, product: res.data })
            })
            .catch(err => console.log(err))
    }, [id])
    function handleSlider(e) {
        setState({ ...state, slider: e });
        let div = document.querySelector('.btns>div');
        let btns = document.querySelectorAll('.btns button');
        div.style.left = `${e * 33.33}%`;
        btns.forEach((btn, index) => btn.style.color = index == e ? 'white' : 'black')
    }
    function handleProductImg(i) {
        let imgs = document.querySelectorAll('.sideImgs img');
        let img = document.querySelector('.imgs img');
        imgs.forEach((img, index) => img.style.border = index == i ? '1px solid black' : 'none');
        setState({ ...state, productImgUrl: imgs[i].src });
    }
    function addToCartHandler() {
        dispatch(addToCart({ id: state.product._id, quantity: state.itemCount, price: state.product.price, name: state.product.title, img: state.product.thumbnail }))
    };
    return (
        <div id="product">
            <div className="top">
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/products')}>All Products</button>
                <button onClick={() => navigate(`/products/${state.product?.category}`)}>Similar</button>
            </div>
            <div className="details">
                <div className="imgs">
                    <div className="sideImgs">
                        {state.product?.imgUrls && state.product.imgUrls.length > 0 ? (
                            state.product.imgUrls.slice(0, 4).map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt=""
                                    onClick={() => handleProductImg(index)}
                                />
                            ))
                        ) : (
                            <img
                                src={state.product?.thumbnail}
                                alt=""
                                onClick={() => handleProductImg(0)}
                            />
                        )}
                    </div>
                    <img src={state.productImgUrl || state.product?.thumbnail} alt="" />
                </div>
                <div className="info">
                    <h3>{state.product?.title}</h3>
                    {state.product === undefined ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="rating">
                            <div className="star" key={state.product?.rating?.rate} style={{
                                background: `linear-gradient(to right, black, black ${state.product?.rating?.rate * 20}%, #e5e5e5 ${state.product?.rating?.rate * 20}%)`,
                                '-webkit-text-fill-color': 'transparent',
                                '-webkit-background-clip': 'text'
                            }}>
                                ⭐⭐⭐⭐⭐
                            </div>
                            <p>({state.product?.rating?.rate.toFixed(1)})</p>
                        </div>
                    )}
                    <hr />
                    <h2>${state.product?.price} <span>${Math.ceil((state.product.price * (1 + (state.product?.discountPercentage) / 100)))}</span></h2>
                    <hr />
                    <div className="variety">
                        <div className="color">
                            <p>Available Colors</p>
                            <div>
                                <span className='active'></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="size">
                            <p>Available Size</p>
                            <div>
                                <span>S</span>
                                <span className='active'>M</span>
                                <span>L</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="cart">
                        <div className="quantity">
                            <button onClick={() => setState({ ...state, itemCount: state.itemCount + 1 })}>+</button>
                            <input type="number" value={state.itemCount} min={1} />
                            <button onClick={() => setState({ ...state, itemCount: state.itemCount > 1 ? state.itemCount - 1 : state.itemCount })}>-</button>
                        </div>
                        <button onClick={addToCartHandler}>Add to Cart</button>
                    </div>
                    <hr />
                    <div className="description">
                        <h3>Description</h3>
                        <p>{state.product?.description}</p>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="btns">
                    <button onClick={() => handleSlider(0)}>Reviews & Ratings</button>
                    <button onClick={() => handleSlider(1)}>Shipping & Return</button>
                    <button onClick={() => handleSlider(2)}>Product Specifications</button>
                    <div></div>
                </div>
                {state.slider == 0 && <Reviews data={state.product?.reviews} />}
                {state.slider == 1 && <Shipping />}
                {state.slider == 2 && <Specs />}
            </div>
        </div>
    )
}

function Specs() {
    return (
        <div className="specs">
            <h3>Description</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit
                . Quisquam, voluptas. Quisquam, voluptas. Quisquam, voluptas.
                Quisquam, voluptas. Quisquam, voluptas. Quisquam, voluptas.
                Quisquam, voluptas. Quisquam, voluptas. Quisquam, voluptas.
                Quisquam, voluptas. Quisquam, voluptas. Quisquam, voluptas.
            </p>
            <h2>Product Related Queries</h2>
            <h4><span>Q. </span>In how many days i can return the product?</h4>
            <p><span>A. </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptates nesciunt? Perspiciatis quis nam suscipit nulla porro officiis pariatur ipsa saepe voluptatem, fuga, consectetur, recusandae alias animi quae reiciendis atque!</p>
            <h4><span>Q. </span>In how many days i can return the product?</h4>
            <p><span>A. </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptates nesciunt? Perspiciatis quis nam suscipit nulla porro officiis pariatur ipsa saepe voluptatem, fuga, consectetur, recusandae alias animi quae reiciendis atque!</p>
            <h4><span>Q. </span>In how many days i can return the product?</h4>
            <p><span>A. </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptates nesciunt? Perspiciatis quis nam suscipit nulla porro officiis pariatur ipsa saepe voluptatem, fuga, consectetur, recusandae alias animi quae reiciendis atque!</p>
            <h4><span>Q. </span>In how many days i can return the product?</h4>
            <p><span>A. </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptates nesciunt? Perspiciatis quis nam suscipit nulla porro officiis pariatur ipsa saepe voluptatem, fuga, consectetur, recusandae alias animi quae reiciendis atque!</p>
        </div>
    )
}

function Shipping() {
    return (
        <div className="shipping">
            <h3>Shipping & Return</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit
                . Quisquam, voluptas. Quisquam, voluptas. Quisquam, voluptas.
                Quisquam, voluptas. Quisquam, voluptas. Quisquam, voluptas.
                Quisquam, voluptas. Quisquam, voluptas. Quisquam, voluptas.
                Quisquam, voluptas. Quisquam, voluptas. Quisquam, voluptas.
            </p>
            <h2>FAQ's</h2>
            <h4><span>Q. </span>In how many days i can return the product?</h4>
            <p><span>A. </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptates nesciunt? Perspiciatis quis nam suscipit nulla porro officiis pariatur ipsa saepe voluptatem, fuga, consectetur, recusandae alias animi quae reiciendis atque!</p>
            <h4><span>Q. </span>In how many days i can return the product?</h4>
            <p><span>A. </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptates nesciunt? Perspiciatis quis nam suscipit nulla porro officiis pariatur ipsa saepe voluptatem, fuga, consectetur, recusandae alias animi quae reiciendis atque!</p>
            <h4><span>Q. </span>In how many days i can return the product?</h4>
            <p><span>A. </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptates nesciunt? Perspiciatis quis nam suscipit nulla porro officiis pariatur ipsa saepe voluptatem, fuga, consectetur, recusandae alias animi quae reiciendis atque!</p>
            <h4><span>Q. </span>In how many days i can return the product?</h4>
            <p><span>A. </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptates nesciunt? Perspiciatis quis nam suscipit nulla porro officiis pariatur ipsa saepe voluptatem, fuga, consectetur, recusandae alias animi quae reiciendis atque!</p>
        </div>
    )
}

function Reviews({ data }) {
    let [state, setState] = useState({ content: '', star: 5 });
    const { id } = useParams();
    let user = useSelector(state => state.user);
    function handleCheckBox(i) {
        let stars = document.querySelectorAll('.input .star svg');
        setState({ ...state, star: i + 1 });
        stars.forEach((star, index) => {
            if (index <= i) {
                star.style.fill = 'black';
            } else {
                star.style.fill = '#e8e8e8';
            }
        })
    }
    function postReview() {
        axios.post(`/review/${id}`, {
            content: state.content,
            rating: state.star
        }).then(res => window.location.reload())
    }
    return (
        <div className="reviews">
            <h3>Reviews & Ratings</h3>
            {user?.fullName ?
                <div className="input">
                    <textarea placeholder="Write a review" value={state.content} onChange={(e) => setState({ ...state, content: e.target.value })} />
                    <div className="star">
                        <label>
                            <input onClick={(e) => handleCheckBox(0)} type="checkbox" name="1star" />
                            <StarSVG />
                        </label>
                        <label>
                            <input onClick={(e) => handleCheckBox(1)} type="checkbox" name="2star" />
                            <StarSVG />
                        </label>
                        <label>
                            <input onClick={(e) => handleCheckBox(2)} type="checkbox" name="3star" />
                            <StarSVG />
                        </label>
                        <label>
                            <input onClick={(e) => handleCheckBox(3)} type="checkbox" name="4star" />
                            <StarSVG />
                        </label>
                        <label>
                            <input onClick={(e) => handleCheckBox(4)} type="checkbox" name="5star" />
                            <StarSVG />
                        </label>
                    </div>
                    <button onClick={postReview}>Post</button>
                </div>
                : 'Login to write a review'}
            {data && data.length > 0 ? (
                data.map((review, index) => (
                    <Comments key={index} data={review} />
                ))
            ) : (
                <div>No Reviews</div>
            )
            }
        </div>
    )
}

function Comments({ data }) {
    console.log(data);
    return (
        <div className="review">
            <div className="user">
                <img src={`${process.env.REACT_APP_SERVER_URL}/profileImages/${data?.user?.profileImgURL}`} alt="" />
                <h4>{data?.user?.fullName}</h4>
            </div>
            <div className="rating">
                <div className="star">
                    <div style={{
                        background: `linear-gradient(to right, black, black ${data?.rating * 20}%, #e5e5e5 ${data?.rating * 20}%)`,
                        '-webkit-text-fill-color': 'transparent',
                        '-webkit-background-clip': 'text'
                    }}>
                        ⭐⭐⭐⭐⭐
                    </div>
                </div>
                <p>({data?.rating}/5)</p>
            </div>
            <div className="content">
                {data?.content}
            </div>
        </div>
    )
}