import React from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    const answer = window.confirm("로그아웃 하시겠습니까 ?");
    if (answer) {
      pb.authStore.clear();
      navigate("/", { replace: true });
    }
    return;
  };

  return (
    <Container>
      <p> {pb.authStore.model.username}님 로그인 ing .. 💭</p>
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
