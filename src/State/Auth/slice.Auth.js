import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "Auth",
    initialState: () => {
        const localData = localStorage.getItem("isLoggedIn");
        if (localData === null) {
            localStorage.setItem("isLoggedIn", "false");
            return { isLoggedIn: initialState };
        }
        return {
            isLoggedIn: localData === "true",
        }

    },
    reducers: {
        userLoggedIn: (state) => {
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", "true");
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
            localStorage.setItem("isLoggedIn", "false");
        }
    }
})
const authReducer = authSlice.reducer;

export default authReducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
