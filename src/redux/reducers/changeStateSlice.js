import { createSlice } from '@reduxjs/toolkit';

const name = 'changeState';

const initialState = {
  sidebarShow: true,
  isLoading: false,
  selectedNav: '',
  collapsedOpen: false,
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
    setCurrentNav(state, action) {
      state.selectedNav = action.payload;
    },
    setCollapsedOpen(state, action) {
      state.collapsedOpen = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSidebarShow, setIsLoading, setCurrentNav, setCollapsedOpen } =
  changeStateSlice.actions;
export default changeStateSlice.reducer;
