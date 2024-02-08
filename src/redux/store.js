import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import dateReducer from "./dateSlice";
import postsReducer from "./postsSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    date: dateReducer,
    posts: postsReducer,
  },
});

export default store;
