import React from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginForm } from "../redux/loginSlice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { resetDate, setDate } from "../redux/dateSlice";
import dayjs from "dayjs";

const MainPage = () => {
  const { username } = useSelector((state) => state.user);
  const date = useSelector((state) => state.date.date);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    const answer = window.confirm("로그아웃 하시겠습니까 ?");
    if (answer) {
      pb.authStore.clear();
      dispatch(resetLoginForm());
      dispatch(resetDate());
      navigate("/", { replace: true });
    }
    return;
  };

  return (
    <Container>
      <p>{username}님 로그인 ing .. 💭</p>
      <button onClick={logout}>로그아웃</button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["StaticDatePicker"]}>
          <DemoItem>
            <StaticDatePicker
              value={dayjs(date)}
              onChange={(e) => dispatch(setDate(e.format("YYYY-MM-DD")))}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 10rem;
`;
