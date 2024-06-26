import React, { useState } from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginForm } from "../redux/loginSlice";
import { resetDate } from "../redux/dateSlice";

import Posts from "../components/Posts";
import Message from "../components/Message";
import DatePicker from "../components/DatePicker";
import * as M from "./MainPage.style";
import { Button, Dialog, DialogActions } from "@mui/material";

const MainPage = () => {
  const date = useSelector((state) => state.date.date);
  const [open, setOpen] = useState(false);

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
    <M.Container>
      <M.HeaderWrapper>
        <M.LogoBox>
          <h3>RUNLEARN</h3>
        </M.LogoBox>
        <M.IconBox>
          <img
            src="/images/question.png"
            alt="question"
            onClick={() => navigate(`/question/${date}`)}
          />

          <img
            src="/images/user-profile.png"
            alt="user-profile"
            onClick={() => setOpen(true)}
          />
          <Dialog
            open={open}
            keepMounted
            onClose={() => setOpen(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogActions>
              <Button onClick={logout}>logout</Button>
              <Button onClick={() => navigate("/profile")}>my page</Button>
            </DialogActions>
          </Dialog>
        </M.IconBox>
      </M.HeaderWrapper>
      <Message />
      <Posts />
      <DatePicker />
    </M.Container>
  );
};

export default MainPage;
