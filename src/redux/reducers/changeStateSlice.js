import { createSlice } from "@reduxjs/toolkit";

const name = "changeState";

const initialState = {
  sidebarShow: true,
};

const changeStateSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSidebarShow(state, action) {
      state.sidebarShow = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSidebarShow } = changeStateSlice.actions;
export default changeStateSlice.reducer;
