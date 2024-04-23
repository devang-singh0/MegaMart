import axios from "../../services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategoryProducts = createAsyncThunk(
    "getCategoryProducts",
    async (category) => {
        const response = await axios.get(`/product/category/${category}`);
        return response.data;
    }
);