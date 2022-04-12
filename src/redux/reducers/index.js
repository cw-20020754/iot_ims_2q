import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import changeStateSlice from './changeStateSlice';
import sharedInfoSlice from './sharedInfoSlice';
import fotaInfoSlice from './fotaInfoSlice';
import { comCodeMgmt } from './adminMgmt';
import { protocolApi } from './iotProtocol';
import { protocolFunc } from './iotProtocol';
import authSlice from './authSlice';
import iotProtocolSlice from './iotProtocolSlice';

const rootReducer = combineReducers({
  changeState: changeStateSlice,
  sharedInfo: sharedInfoSlice,
  fotaInfo: fotaInfoSlice,
  comCodeMgmt: comCodeMgmt,
  auth: authSlice,
  protocolApi: protocolApi,
  protocolFunc: protocolFunc,
  iotProtocol: iotProtocolSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export default persistReducer(persistConfig, rootReducer);
