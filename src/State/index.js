import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Auth/slice.Auth';
import userReducer from './User/slice.User';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
})

export default store;