import { logger } from "redux-logger";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "../reducers";

const store = configureStore({
  reducer,
  middleware:
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware({
          serializableCheck: false,
        })
      : getDefaultMiddleware({
          serializableCheck: false,
        }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
