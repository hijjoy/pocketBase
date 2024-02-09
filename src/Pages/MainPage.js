import React from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginForm } from "../redux/loginSlice";
import { resetDate } from "../redux/dateSlice";

import Posts from "../components/Posts";
import Message from "../components/Message";
import DatePicker from "../components/\bDatePicker";

const MainPage = () => {
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
      <HeaderWrapper>
        <LogoBox>
          <h3>RUNLEARN</h3>
        </LogoBox>
        <IconBox>
          <img
            src="/images/question.png"
            alt="question"
            onClick={() => navigate(`/question/${date}`)}
          />
          <img
            src="/images/user-profile.png"
            alt="user-profile"
            //onClick={() => navigate("/profile")}
            onClick={logout}
          />
        </IconBox>
      </HeaderWrapper>
      <Message />
      <Posts />
      <DatePicker />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 4rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoBox = styled.div`
  color: #6c6c6c;
`;

const IconBox = styled.div`
  margin-left: 11.5rem;
  img {
    margin-left: 0.6rem;
  }
`;
