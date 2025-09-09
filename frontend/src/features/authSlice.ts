import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: [],
        isLoggedIn: false
    },
    reducers: {
        setUserIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setCurrentUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const {setUserIsLoggedIn, setCurrentUserInfo} = authSlice.actions

export default authSlice.reducer