import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: dayjs().format("YYYY-MM-DD"),
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    resetDate: (state) => {
      state.date = dayjs().format("YYYY-MM-DD");
    },
  },
});

export default dateSlice.reducer;
export const { setDate, resetDate } = dateSlice.actions;
