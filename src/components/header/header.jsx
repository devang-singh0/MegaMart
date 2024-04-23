import { useState, useRef, useEffect } from "react";
import { MagnifyingGlass, X, Columns, User, ShoppingCart } from 'phosphor-react';
import { login } from "../../store/slices/user";
import './header.scss'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/cart";
import axios from "../../services/axios";
import { setAlert, setAlertOff } from "../../store/slices/alert";
export function Header() {
    let navigate = useNavigate();
    let ref = useRef();
    let dispatch = useDispatch();
    let user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(login());
    });
    let [state, setState] = useState({ icon: 0, searchVisible: false, cartVisible: false, searchResults: [] })
    function searchClicked(e) {
        e.stopPropagation();
        if (window.innerWidth <= 768) {
            const input = document.querySelector('#searchDiv input');
            const isActive = input.classList.toggle('active');
            setState({ ...state, icon: isActive ? 1 : 0 });
        };
    }
    function handleCartToggle(e) {
        setState({ ...state, cartVisible: !state.cartVisible });
    }
    function search(e) {
        setState({ ...state, searchVisible: true });
        if (state.cartVisible) {
            setState({ ...state, cartVisible: false });
        }
        if (e.target.value.length > 2) {
            axios.get(`/search?query=${e.target.value}`).then((res) => {
                setState({ ...state, searchResults: res.data })
            })
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            let div = document.querySelector('.searchedProducts');
            if (!(div?.contains?.(e.target))) {
                setState({ ...state, searchVisible: false });
                ref.current.value = '';
            }
        };

        if (state.searchVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [state.searchVisible]);
    return (
        <nav id="navBar">
            <div id="logoDiv">
                <Columns id="column" size={38} />
                <h3>MegaMart</h3>
            </div>
            <div>
                <div id="searchDiv">
                    <input placeholder="Search essentials, groceries and more..." onChange={search} ref={ref} />
                    {state.icon == 0 && <MagnifyingGlass size={18} id="searchIcon" onClick={searchClicked} />}
                    {state.icon == 1 && <X size={18} id="searchIcon" onClick={searchClicked} />}
                    {state.searchVisible && <div className="searchedProducts">
                        {ref.current.value.length > 2 && state?.searchResults?.map((item) => <Item data={item} />)}
                        {ref.current?.value.length < 3 && <p>Enter atleast 3 characters</p>}
                        {state.searchResults.length == 0 && ref.current.value.length > 2 && <p>No results found</p>}
                    </div>}
                </div>
                <div id="userInteraction">
                    <div className="user" onClick={() => navigate('/user')}>
                        {user?.profileImgURL ? <img src={`${process.env.REACT_APP_SERVER_URL}/profileImages/${user?.profileImgURL}`} alt="" /> : <User size={24} id="userIcon" />}
                        <p> {user?.fullName || 'Register'}</p>
                    </div>
                    <div className="line"></div>
                    <div className="cart">
                        {!state.cartVisible && <ShoppingCart size={24} id="cartIcon" onClick={handleCartToggle} />}
                        {state.cartVisible && <X size={24} id="cartIcon" onClick={handleCartToggle} />}
                        {state.cartVisible && <Cart />}
                    </div>
                </div>
            </div>
            <Alert />
        </nav>
    )
}

export function Item({ data }) {
    let navigate = useNavigate();
    return (
        <div className="item" onClick={() => navigate(`/product/${data._id}`)}>
            <img src={data.thumbnail} alt="" />
            <div>
                <h4>{data.title}</h4>
                <p>${data.price}</p>
            </div>
        </div>
    )
}

function Alert() {
    let alert = useSelector(state => state.alert);
    let dispatch = useDispatch();
    function handleRemove(e) {
        dispatch(setAlertOff());
    }
    setTimeout(() => {
        dispatch(setAlertOff());
    }, 3000);
    return (
        <>
            {alert.isActive && <div id="alert" className={alert.type}>
                <p>{alert.data}</p>
                <button onClick={handleRemove}><X /></button>
            </div>}
        </>
    );
}