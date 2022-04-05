import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import changeStateSlice from './changeStateSlice';
import sharedInfoSlice from './sharedInfoSlice';
import fotaInfoSlice from './fotaInfoSlice';
import { comCodeMgmt } from './adminMgmt';
import { protocolApi } from './iotProtocol';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  changeState: changeStateSlice,
  sharedInfo: sharedInfoSlice,
  fotaInfo: fotaInfoSlice,
  comCodeMgmt: comCodeMgmt,
  auth: authSlice,
  protocolApi: protocolApi,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export default persistReducer(persistConfig, rootReducer);
