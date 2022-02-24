import { createSlice } from '@reduxjs/toolkit';

const name = 'changeState';

const initialState = {
  sidebarShow: true,
  isLoading: false,
  toolbarItem: null,
};

const changeStateSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSidebarShow(state, action) {
      state.sidebarShow = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    getDatagridToolbar(state, action) {
      state.toolbarItem = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSidebarShow, setIsLoading, getDatagridToolbar } =
  changeStateSlice.actions;
export default changeStateSlice.reducer;
