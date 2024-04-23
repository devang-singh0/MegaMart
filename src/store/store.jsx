import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import categoryReducer from './slices/categories';
import cartReducer, { addToCart, emptyCart, removeFromCart, updateQuantity } from './slices/cart';
import alertReducer from './slices/alert';
import productReducer from './slices/products';
const cartMiddleware = (storeAPI) => (next) => (action) => {
    let result = next(action);

    if ([addToCart.type, removeFromCart.type, updateQuantity.type, emptyCart.type].includes(action.type)) {
        window.localStorage.setItem('cart', JSON.stringify(storeAPI.getState().cart));
    }

    return result;
};

let preloadedState;
const savedCart = window.localStorage.getItem('cart');
if (savedCart) {
    preloadedState = {
        cart: JSON.parse(savedCart)
    };
}

export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoryReducer,
        cart: cartReducer,
        alert: alertReducer,
        products: productReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
});