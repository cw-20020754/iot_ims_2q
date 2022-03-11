import { combineReducers } from 'redux';
import changeStateSlice from './changeStateSlice';
import sharedInfoSlice from './sharedInfoSlice';
import fotaInfoSlice from './fotaInfoSlice';
import { comCodeMgmt } from './adminMgmt';

export default combineReducers({
  changeState: changeStateSlice,
  sharedInfo: sharedInfoSlice,
  fotaInfo: fotaInfoSlice,
  comCodeMgmt: comCodeMgmt,
});
