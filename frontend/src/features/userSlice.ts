import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    updateCurrentUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo, updateCurrentUserInfo } = userSlice.actions;

export default userSlice.reducer;
