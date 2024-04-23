import { createSlice } from "@reduxjs/toolkit";



const alertSlice = createSlice({
    name: "alert",
    initialState: {
        data: '',
        isActive: false,
        type: 'danger',
    },
    reducers: {
        setAlert: (state, action) => {
            state.data = action.payload.data;
            state.type = action.payload.type;
            state.isActive = true;
        },
        setAlertOff: (state) => {
            state.isActive = false;
            state.data = '';
        },
    },
});

export const { setAlert, setAlertOff } = alertSlice.actions;
export default alertSlice.reducer;