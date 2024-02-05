import React, { useState } from "react";
import { pb } from "../lib/pocketbase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    <div>
      <SignUpForm>
        username
        <input
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required="required"
        />
        비밀번호
        <input
          value={password}
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required="required"
        />
        비밀번호 확인
        <input
          value={passwordConfirm}
          name="passwordConfirm"
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Password"
          required="required"
        />
        이메일
        <input
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required="required"
        />
        <button onClick={(e) => handleSubmit(e)}>회원가입</button>
      </SignUpForm>
    </div>
  );
};

export default SignUp;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 10rem;

  input {
    margin-top: 0.2rem;
    margin-bottom: 1rem;
  }
`;
