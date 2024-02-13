import React, { useState } from "react";
import { Container } from "./MainPage.style";
import { EditorHeaderWrapper } from "../components/Editor";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MessageContainer } from "../components/Message";
import { pb } from "../lib/pocketbase";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../redux/loginSlice";
import { NoPostsContaioner } from "../components/Posts.style";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { username } = useSelector((state) => state.login);
  const { date } = useSelector((state) => state.date);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateUsername = async () => {
    const data = {
      username: username,
    };
    try {
      await pb.collection("users").update(pb.authStore.model.id, data);
    } catch (e) {
      console.log(e);
    }

    setIsEdit(false);
  };

  // 404 error
  const updatePassword = async () => {
    console.log(password, passwordConfirm, oldPassword);
    const data = {
      password: password,
      passwordConfirm: passwordConfirm,
      oldPassword: oldPassword,
    };

    try {
      await pb.collection("users").update(pb.authStore.model.id, data);
    } catch (e) {
      console.log(e);
    }

    // 초기화 ?
    setPassword("");
    setPasswordConfirm("");
    setOldPassword("");
  };

  return (
    <Container>
      <ProfileHeaderWrapper>
        <img src="/images/nav.png" alt="nav" onClick={() => navigate(-1)} />
        <h4>RUNLEARN</h4>
      </ProfileHeaderWrapper>
      <ProfileContainer>
        <ProfileBox>
          <div>
            {isEdit ? (
              <input
                type="text"
                placeholder={pb.authStore.model.username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
              />
            ) : (
              `👋🏻 ${pb.authStore.model.username}님 안녕하세요 !`
            )}
          </div>
          {isEdit ? (
            <img src="/images/check.png" alt="save" onClick={updateUsername} />
          ) : (
            <img
              src="/images/pen.png"
              alt="pen"
              onClick={() => setIsEdit(!isEdit)}
            />
          )}
        </ProfileBox>
        <ProfileBox2>
          <div>📊 {date.slice(5, 7)}월 이해도 통계를 알려드릴게요 !</div>
        </ProfileBox2>
        <FieldsBox></FieldsBox>
        <PasswordContainer>
          <Accordion
            style={{
              borderRadius: "10px",
              border: "1px solid #CFCFCF",
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  color: "#6c6c6c",
                }}
              >
                🔒 Change Password
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TypographyContent>
                <InputBox>
                  <input
                    type="password"
                    placeholder="이전 비밀번호"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="새 비밀번호"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </InputBox>
                <ButtonBox>
                  <button onClick={updatePassword}>change</button>
                </ButtonBox>
              </TypographyContent>
            </AccordionDetails>
          </Accordion>
        </PasswordContainer>
      </ProfileContainer>
    </Container>
  );
};

export default Profile;

const ProfileHeaderWrapper = styled(EditorHeaderWrapper)`
  margin-top: -0.3rem;
  margin-left: 13rem;
  h4 {
    padding-left: 6.9rem;
    color: #6c6c6c;
  }
`;

const ProfileBox = styled(MessageContainer)`
  margin-top: 1rem;
  margin-left: 0.3rem;
`;

const ProfileBox2 = styled(ProfileBox)`
  background-color: #e7e7e7;
  div {
    color: #4f4d4d;
  }
`;

const ProfileContainer = styled.div``;

const FieldsBox = styled(NoPostsContaioner)`
  margin-left: 0.4rem;
  height: 301px;
`;

const PasswordContainer = styled.div`
  width: 334px;
  margin-left: 0.4rem;
  margin-top: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.6rem;

  input {
    border: none;
    border-bottom: 1px solid #cfcfcf;
    width: 10rem;
    height: 1.3rem;
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
    padding-right: 1rem;
  }
`;

const TypographyContent = styled(Typography)`
  display: flex;
  justify-content: center;
`;

const ButtonBox = styled.div`
  margin-top: 0.3rem;
  Button {
    border: none;
    border-radius: 7px;
    width: 74px;
    height: 5.5rem;
    font-size: 0.7rem;
    color: #676767;
    font-weight: 500;
  }
`;
