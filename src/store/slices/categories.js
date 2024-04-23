import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";
import { getCategoryProducts } from "./global";


export const getCategories = createAsyncThunk(
    "getCategories",
    async () => {
        const response = await axios.get(`/categories`);
        return response.data;
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        data: [],
        activeCategory: 'electronics',
        activeCategoryProducts: [],
    },
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload.type;
            getCategoryProducts(action.payload.type);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(getCategoryProducts.fulfilled, (state, action) => {
            state.activeCategoryProducts = action.payload;
        });
    },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;