import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        allPosts: [],
        onePost: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        setAllPosts: (state, action) => {
            state.allPosts = action.payload
        },
        setOnePost: (state, action) => {
            state.onePost = action.payload
        }
    }
})

export const {setPosts, setAllPosts, setOnePost} = postSlice.actions

export default postSlice.reducer