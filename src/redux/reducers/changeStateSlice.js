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
    snackBarStyle: {},
    alertStyle: {},
    vertical: 'top',
    horizontal: 'center',
    elevation: 6,
    severity: 'error',
    variant: 'filled',
  },
  searchConditionParams: {},
};

const changeStateSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSidebarShow(state, action) {
      state.sidebarShow = action.payload;
    },
    GlobalLoading(state, action) {
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
    setSearchConditionParam(state, action) {
      const param = action.payload;

      if (param) {
        state.searchConditionParams = {
          ...state.searchConditionParams,
          [param.name]: param.value,
        };
      } else {
        state.searchConditionParams = {};
      }
    },
  },
  extraReducers: {},
});

export const {
  setSidebarShow,
  GlobalLoading,
  getDatagridInfo,
  setSnackbar,
  setSearchConditionParam,
} = changeStateSlice.actions;
export default changeStateSlice.reducer;
