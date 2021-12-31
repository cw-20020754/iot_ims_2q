import { combineReducers } from "redux";
import changeStateSlice from "./changeStateSlice";
import productInfoSlice from "./productInfoSlice";
import fotaInfoSlice from "./fotaInfoSlice";
import sharedInfoSlice from "./sharedInfoSlice";

export default combineReducers({
  productInfo: productInfoSlice,
  changeState: changeStateSlice,
  sharedInfo: sharedInfoSlice,
  fotaInfo: fotaInfoSlice,
});
