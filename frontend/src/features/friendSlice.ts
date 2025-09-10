import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
    name: "friend",
    initialState: {
        followingUsers: []
    },
    reducers: {
        setFollowingUsers: (state, action) => {
            state.followingUsers = action.payload
        }
    }
})

export const {setFollowingUsers} = friendSlice.actions

export default friendSlice.reducer