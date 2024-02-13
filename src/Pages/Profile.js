import React, { useState } from "react";
import { Container } from "./MainPage.style";
import { useNavigate } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../redux/loginSlice";
import * as P from "./Profile.style";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  // const [oldPassword, setOldPassword] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

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
  // const updatePassword = async () => {
  //   console.log(password, passwordConfirm, oldPassword);
  //   const data = {
  //     password: password,
  //     passwordConfirm: passwordConfirm,
  //     oldPassword: oldPassword,
  //   };

  //   try {
  //     await pb.collection("users").update(pb.authStore.model.id, data);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   // 초기화 ?
  //   setPassword("");
  //   setPasswordConfirm("");
  //   setOldPassword("");
  // };

  return (
    <Container>
      <P.ProfileHeaderWrapper>
        <img src="/images/nav.png" alt="nav" onClick={() => navigate(-1)} />
        <h4>RUNLEARN</h4>
      </P.ProfileHeaderWrapper>
      <P.ProfileContainer>
        <P.ProfileBox>
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
        </P.ProfileBox>
        <P.ProfileBox2>
          <div>📊 {date.slice(5, 7)}월 이해도 통계를 알려드릴게요 !</div>
        </P.ProfileBox2>
        <P.FieldsBox></P.FieldsBox>
        <P.PasswordContainer>
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
              <P.TypographyContent>
                <P.InputBox>
                  <input
                    type="password"
                    placeholder="이전 비밀번호"
                    //onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="새 비밀번호"
                    //onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    //onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </P.InputBox>
                <P.ButtonBox>
                  <button>change</button>
                </P.ButtonBox>
              </P.TypographyContent>
            </AccordionDetails>
          </Accordion>
        </P.PasswordContainer>
      </P.ProfileContainer>
    </Container>
  );
};

export default Profile;
