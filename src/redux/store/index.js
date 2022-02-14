import { logger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
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
