import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: true,
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.isLoggedIn = true;
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
        }
    }
})
const authReducer = authSlice.reducer;

export default authReducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions 
