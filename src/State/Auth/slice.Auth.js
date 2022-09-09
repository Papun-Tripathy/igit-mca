import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: true,
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.isLoggedIn = true;
        },
        loggedOut: (state) => {
            state.isLoggedIn = false;
        }
    }
})
const authReducer = authSlice.reducer;

export default authReducer;
export const authAction = authSlice.actions 
