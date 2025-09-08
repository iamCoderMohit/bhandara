import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        allPosts: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        setAllPosts: (state, action) => {
            state.allPosts = action.payload
        }
    }
})

export const {setPosts, setAllPosts} = postSlice.actions

export default postSlice.reducer