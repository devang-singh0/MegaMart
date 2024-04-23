import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";

export const login = createAsyncThunk(
    "login",
    async () => {
        const response = await axios.get(`/user`);
        return response.data;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {},
    extraReducers: (builder)=>{
        builder.addCase(login.fulfilled, (state, action) => {
            Object.assign(state, action.payload);
        });
    },
});

export default userSlice.reducer;