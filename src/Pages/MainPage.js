import React from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginForm } from "../redux/loginSlice";

const MainPage = () => {
  const { username } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    const answer = window.confirm("로그아웃 하시겠습니까 ?");
    if (answer) {
      pb.authStore.clear();
      dispatch(resetLoginForm());
      navigate("/", { replace: true });
    }
    return;
  };

  return (
    <Container>
      <p> {username}님 로그인 ing .. 💭</p>
      <button onClick={logout}>로그아웃</button>
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
