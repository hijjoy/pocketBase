import React, { useState } from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";

import * as S from "./SignUp.style";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    try {
      await pb.collection("users").create(data);
      alert(`${username}님 회원가입을 축하드립니다 🥳`);
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <S.UserContainer fixed autoComplete="on">
      <S.UserGrid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h2>✍🏻</h2>
        <S.UserInput
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />

        <S.UserInput
          value={password}
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <S.UserInput
          value={passwordConfirm}
          name="passwordConfirm"
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="password confirm"
        />

        <S.UserInput
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <S.UserButton variant="outlined" onClick={(e) => handleSubmit(e)}>
          회원가입
        </S.UserButton>
      </S.UserGrid>
    </S.UserContainer>
  );
};

export default SignUp;
