import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: ""
}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers:{
        setValue: (state, action)=>{
            state = {...state, ...action.payload };
        },
        emptyValue: (state) =>{
            state = initialState;
        }
    },
})

const {reducer: userReducer, actions: authActions} = userSlice;

export default userReducer;
export {authActions};