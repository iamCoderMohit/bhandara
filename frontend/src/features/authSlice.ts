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
        }
    }
})

export const {setUserIsLoggedIn} = authSlice.actions

export default authSlice.reducer