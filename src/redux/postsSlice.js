import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
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
    setId: (state, action) => {
      state.id = action.payload;
    },
    setReset: (state) => {
      state.title = "";
      state.content = "";
      state.question = "";
      state.field = "";
    },
  },
});

export const { setTitle, setContent, setQuestion, setField, setId, setReset } =
  postsSlice.actions;
export default postsSlice.reducer;
