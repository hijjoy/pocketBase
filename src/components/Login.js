import React from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as S from "./SignUp.style";
import { useDispatch, useSelector } from "react-redux";
import { setPassword, setUsername } from "../redux/loginSlice";

const Login = () => {
  const { username, password } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await pb.collection("users").authWithPassword(username, password);
      alert(`${username}님 환영합니다 🤩`);
      navigate("/main", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <S.UserContainer>
      <S.UserGrid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h2 style={{ marginTop: -10 }}>✍🏻</h2>
        <InputBox>
          <S.UserInput
            value={username}
            name="username"
            onChange={(e) => dispatch(setUsername(e.target.value))}
            placeholder="username"
          />
          <S.UserInput
            value={password}
            name="password"
            type="password"
            onChange={(e) => dispatch(setPassword(e.target.value))}
            placeholder="Password"
          />
        </InputBox>

        <S.UserButton variant="outlined" onClick={(e) => handleSubmit(e)}>
          로그인
        </S.UserButton>
        <UserText onClick={() => navigate("/signup")}>회원가입 🏃🏻‍♂️</UserText>
      </S.UserGrid>
    </S.UserContainer>
  );
};

export default Login;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const UserText = styled.div`
  font-size: 0.7rem;
  margin-top: 4rem;
  margin-bottom: -5rem;
  margin-left: 15rem;
  color: gray;

  &:hover {
    cursor: pointer;
    color: #0062cc;
  }
`;
