import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isVerifyed: false,
}

const authSlice = createSlice({
    name: "Auth",
    initialState: () => {
        const localLoginData = localStorage.getItem("isLoggedIn");
        const localVerificationData = localStorage.getItem("isVerifyed");
        if (localLoginData === null) {
            localStorage.setItem("isLoggedIn", "false");
            return initialState;
        }
        return {
            isLoggedIn: localLoginData === "true",
            isVerifyed: localVerificationData === "true",
        }

    },
    reducers: {
        userLoggedIn: (state) => {
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", "true");
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
            localStorage.clear();
            localStorage.setItem("isLoggedIn", "false");
            localStorage.setItem("isVerifyed", "false");
        },
        userVerifyed: (state) =>{
            state.isVerifyed = true;
            localStorage.setItem("isVerifyed", "true");
        }
    }
})
const authReducer = authSlice.reducer;

export default authReducer;
export const { userLoggedIn, userLoggedOut, userVerifyed } = authSlice.actions;
