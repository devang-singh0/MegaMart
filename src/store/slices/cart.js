import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {},
    reducers: {
        addToCart: (state, action) => {
            if (state[action.payload.id]) {
                state[action.payload.id].quantity += action.payload.quantity;
            } else {
                state[action.payload.id] = {
                    ...action.payload,
                };
            }
        },
        removeFromCart: (state, action) => {
            delete state[action.payload.id];
        },
        updateQuantity: (state, action) => {
            state[action.payload.id].quantity = action.payload.quantity;
        },
        emptyCart: (state) => {
            return {};
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;