import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    profilePic: "",
    branch: "",
    linkedIn: "",
    insta: "",
    company: "",
}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUserValue: (state, action) => {
            const {
                name, email, phoneNumber, profilePic, branch, linkedIn, insta, company
            } = action.payload;
            state = { ...state, 
                name, 
                email, 
                branch, 
                phoneNumber, 
                insta: insta ?? "", 
                company: company ?? "",
                linkedIn: linkedIn ?? "", 
                profilePic: profilePic ?? "",
            }
        },
        emptyValue: (state) => {
            state = initialState;
        }
    },
})

const { reducer: userReducer, actions: authActions } = userSlice;

export default userReducer;
export { authActions };