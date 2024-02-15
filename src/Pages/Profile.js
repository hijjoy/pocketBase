import React, { useEffect, useState } from "react";
import { Container } from "./MainPage.style";
import { useNavigate } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../redux/loginSlice";
import * as P from "./Profile.style";
import request from "../api/request";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { headers } from "../lib/headers";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [fieldsLength, setFieldsLength] = useState([0, 0, 0]);

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

  useEffect(() => {
    const fetchData = async () => {
      const filter = `user="${pb.authStore.model.id}"`;

      const res = await fetch(`${request.posts}?filter=${filter}`, {
        headers: headers,
      });
      const data = await res.json();

      const selectData = data.items.filter(
        (e) => e.date.slice(0, 7) === date.slice(0, 7)
      );

      const selectField1 = selectData.filter(
        (e) => e.field === "😊 완전 이해했어요"
      );
      const selectField2 = selectData.filter(
        (e) => e.field === "😐조금 이해했어요"
      );
      const selectField3 = selectData.filter(
        (e) => e.field === "😥 잘 모르겠어요"
      );

      setFieldsLength([
        selectField1.length,
        selectField2.length,
        selectField3.length,
      ]);
    };

    fetchData();
  }, [date.slice(0, 7), pb.authStore]);

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
          <div>
            {isEdit ? (
              <img
                src="/images/check.png"
                alt="save"
                onClick={updateUsername}
              />
            ) : (
              <img
                src="/images/pen.png"
                alt="pen"
                onClick={() => setIsEdit(!isEdit)}
              />
            )}
          </div>
        </P.ProfileBox>
        <P.ProfileBox2>
          <div>📊 {date.slice(5, 7)}월 이해도 통계를 알려드릴게요 !</div>
          <P.FieldIcon>😊 완전 이해했어요</P.FieldIcon>
          <P.FieldLength $length={fieldsLength[0]}></P.FieldLength>
          <P.FieldIcon1>😐 조금 이해했어요</P.FieldIcon1>
          <P.FieldLength1 $length={fieldsLength[1]}></P.FieldLength1>
          <P.FieldIcon2>😥 잘 모르겠어요</P.FieldIcon2>
          <P.FieldLength2 $length={fieldsLength[2]}></P.FieldLength2>
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
