import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";

const store = configureStore({
  reducer: {
    user: loginReducer,
  },
});

export default store;
