import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },

    resetLoginForm: (state) => {
      // 폼 지우기 위해서
      state.username = "";
      state.password = "";
    },
  },
});

export default loginSlice.reducer;
export const { setUsername, setPassword, resetLoginForm } = loginSlice.actions;
