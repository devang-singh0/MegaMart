import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";

export const getProducts = createAsyncThunk(
    "getProducts",
    async (_, { getState }) => {
        const { extras } = getState().products;
        const response = await axios.get(`/product`, {
            params: extras,
            withCredentials: true
        });
        return response.data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        extras: {
            discount: 0,
            rating: 0,
            price: [1, 2500],
            category: "",
            limit: 10,
            page: 1,
            sort: {
                value: "Sort by",
                index: 0,
            },
            totalPages: 1,
            totalProducts: 0
        }
    },
    reducers: {
        setFilters: (state, action) => {
            state.extras = { ...state.extras, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.data = action.payload.products;
            state.extras.totalPages = action.payload.totalPages;
            state.extras.totalProducts = action.payload.totalCount;
        });
    },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;