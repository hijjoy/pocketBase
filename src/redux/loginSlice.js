import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  oldPassword: "",
  passwordConfirm: "",
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

    setOldPassword: (state, action) => {
      state.oldPassword = action.payload;
    },
    setPasswordConfirm: (state, action) => {
      state.passwordConfirm = action.payload;
    },

    resetPasswordForm: (state) => {
      state.oldPassword = "";
      state.passwordConfirm = "";
      state.password = "";
    },
  },
});

export default loginSlice.reducer;
export const {
  setUsername,
  setPassword,
  resetLoginForm,
  setOldPassword,
  setPasswordConfirm,
  resetPasswordForm,
} = loginSlice.actions;
