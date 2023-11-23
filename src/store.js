import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./formslice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
