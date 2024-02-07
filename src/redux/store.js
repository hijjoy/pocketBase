import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import dateReducer from "./dateSlice";

const store = configureStore({
  reducer: {
    user: loginReducer,
    date: dateReducer,
  },
});

export default store;
