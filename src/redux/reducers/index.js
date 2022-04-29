import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sharedInfo from './common/sharedInfo';
import { comCodeMgmt } from './adminMgmt';
import { protocolApi } from './iotProtocol';
import { protocolFunc } from './iotProtocol';
import auth from './auth/auth';
import prodByProtocol from './iotProtocol/prodByProtocol';
import {
  certPolicyMgmt,
  firmwareMgmt,
  fotaPolicyMgmt,
  fotaStatus,
} from './fota';

const rootReducer = combineReducers({
  sharedInfo: sharedInfo,
  comCodeMgmt: comCodeMgmt,
  auth: auth,
  protocolApi: protocolApi,
  protocolFunc: protocolFunc,
  iotProtocol: prodByProtocol,
  firmwareMgmt: firmwareMgmt,
  fotaPolicyMgmt: fotaPolicyMgmt,
  certPolicyMgmt: certPolicyMgmt,
  fotaStatus: fotaStatus,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export default persistReducer(persistConfig, rootReducer);
