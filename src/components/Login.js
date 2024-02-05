import React, { useState } from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignUpForm } from "./SignUp";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
    <div>
      <LoginForm>
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
        <Button>
          <button onClick={(e) => handleSubmit(e)}>로그인</button>
          <button onClick={() => navigate("/signup")}>회원가입</button>
        </Button>
      </LoginForm>
    </div>
  );
};

export default Login;

const LoginForm = styled(SignUpForm)``;

const Button = styled.div`
  button {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
`;
