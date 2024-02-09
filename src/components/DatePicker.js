import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../redux/dateSlice";
import styled from "styled-components";

const DatePicker = () => {
  const date = useSelector((state) => state.date.date);

  const dispatch = useDispatch();
  return (
    <DateWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["StaticDatePicker"]}>
          <DemoItem>
            <DatePickerBox
              value={dayjs(date)}
              onChange={(e) => dispatch(setDate(e.format("YYYY-MM-DD")))}
              slotProps={{
                actionBar: {
                  actions: [],
                },
                toolbar: {
                  hidden: true,
                },
              }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </DateWrapper>
  );
};

export default DatePicker;

const DateWrapper = styled.div`
  margin-top: 1rem;
`;

const DatePickerBox = styled(StaticDatePicker)`
  background-color: #f8f8f8;
  color: #98a6cd;
`;
