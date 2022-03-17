import { createSlice } from '@reduxjs/toolkit';

const name = 'changeState';

const initialState = {
  sidebarShow: true,
  isLoading: false,
  toolbarItem: null,
  snackbar: {
    snackbarOpen: false,
    snackbarMessage: '',
    autoHideDuration: 0,
    sStyle: {},
    aStyle: {},
    vertical: 'top',
    horizontal: 'center',
    elevation: 6,
    severity: 'error',
    variant: 'filled',
  },
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
    getDatagridInfo(state, action) {
      state.toolbarItem = action.payload;
    },
    setSnackbar(state, action) {
      state.snackbar = {
        ...state.snackbar,
        ...action.payload,
      };
    },
  },
  extraReducers: {},
});

export const { setSidebarShow, setIsLoading, getDatagridInfo, setSnackbar } =
  changeStateSlice.actions;
export default changeStateSlice.reducer;
