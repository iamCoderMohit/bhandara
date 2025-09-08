import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        postComments: []
    },
    reducers: {
        setPostComments: (state, action) => {
            state.postComments = action.payload
        }
    }
})

export const {setPostComments} = commentSlice.actions

export default commentSlice.reducer