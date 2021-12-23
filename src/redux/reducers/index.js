import { combineReducers } from "redux";
import changeStateSlice from "./changeStateSlice";
import getDataSlice from "./getDataSlice";
import productInfoSlice from "./productInfoSlice";
import fotaInfoSlice from "./fotaInfoSlice";

export default combineReducers({
  productInfo: productInfoSlice,
  changeState: changeStateSlice,
  getData: getDataSlice,
  fotaInfo: fotaInfoSlice,
});
