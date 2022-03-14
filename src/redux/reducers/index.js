import { combineReducers } from 'redux';
import changeStateSlice from './changeStateSlice';
import sharedInfoSlice from './sharedInfoSlice';
import fotaInfoSlice from './fotaInfoSlice';
import { comCodeMgmt } from './adminMgmt';
import authSlice from './authSlice';

export default combineReducers({
  changeState: changeStateSlice,
  sharedInfo: sharedInfoSlice,
  fotaInfo: fotaInfoSlice,
  comCodeMgmt: comCodeMgmt,
  auth: authSlice,
});
