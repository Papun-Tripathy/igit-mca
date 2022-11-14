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
    registered: false,
}

const userSlice = createSlice({
    name: "User",
    initialState: () => {
        const localUser = localStorage.getItem("UserAuth");
        if (localUser === null) {
            return initialState;
        }
        const userData = JSON.parse(localUser);
        const {
            name, email, phoneNumber, profilePic, branch, linkedIn, insta, company
        } = userData;
        return {
            name,
            email,
            branch,
            phoneNumber,
            registered: true,
            insta: insta ?? "",
            company: company ?? "",
            linkedIn: linkedIn ?? "",
            profilePic: profilePic ?? "",
        }
    },
    reducers: {
        setUserValue: (state, action) => {
            const {
                name, email, phoneNumber, profilePic, branch, linkedIn, insta, company
            } = action.payload;
            localStorage.setItem("UserAuth", JSON.stringify({ name, email, phoneNumber, profilePic, branch, linkedIn, insta, company }));
            state.name = name;
            state.email = email;
            state.branch = branch;
            state.phoneNumber = phoneNumber;
            state.registered = true;
            state.insta = insta ?? "";
            state.company = company ?? "";
            state.linkedIn = linkedIn ?? "";
            state.profilePic = profilePic ?? "";

        },
        emptyValue: (state) => {
            state = initialState;
            localStorage.removeItem("UserAuth");
        }
    },
});

const userReducer = userSlice.reducer;

export default userReducer ;
export const {setUserValue, emptyValue} = userSlice.actions;