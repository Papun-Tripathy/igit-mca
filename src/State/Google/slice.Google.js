import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: "",
    displayName: "",
    emailVerified: false,
    isAnonymous: false,
    photoURL: "",
    email: "",
    uid: "", 
}

const googleSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setAtLogin:(state, action)=>{
            const {accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid} = action.payload;
            state = {...state, accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid};
        },
        resetAtLogout: (state) =>{
            state= initialState;
        }
    }
})
const googleReducer = googleSlice.reducer;

export default googleReducer;
export const { setAtLogin, resetAtLogout } = googleSlice.actions;
