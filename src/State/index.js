import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Auth/slice.Auth';
import googleReducer from './Google/slice.Google';
import userReducer from './User/slice.User';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        google: googleReducer,
    },
})

export default store;