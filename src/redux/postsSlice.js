import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  title: "",
  content: "",
  question: "",
  field: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setField: (state, action) => {
      state.field = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },

    setReset: (state) => {
      state.title = "";
      state.content = "";
      state.question = "";
      state.field = "";
      state.date = "";
    },
  },
});

export const {
  setTitle,
  setContent,
  setQuestion,
  setField,
  setDate,
  setReset,
} = postsSlice.actions;
export default postsSlice.reducer;
