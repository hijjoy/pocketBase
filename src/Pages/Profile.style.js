import { Typography } from "@mui/material";
import styled from "styled-components";
import { NoPostsContaioner } from "../components/Posts.style";
import { EditorHeaderWrapper } from "../components/Editor.style";
import { MessageContainer } from "../components/Message.style";

export const ProfileHeaderWrapper = styled(EditorHeaderWrapper)`
  margin-top: -0.3rem;
  margin-left: 13rem;
  h4 {
    padding-left: 6.9rem;
    color: #6c6c6c;
  }
`;

export const ProfileBox = styled(MessageContainer)`
  margin-top: 1rem;
  margin-left: 0.3rem;
`;

export const ProfileBox2 = styled(ProfileBox)`
  background-color: #e7e7e7;
  div {
    color: #4f4d4d;
  }
`;

export const ProfileContainer = styled.div``;

export const FieldsBox = styled(NoPostsContaioner)`
  margin-left: 0.4rem;
  height: 301px;
`;

export const PasswordContainer = styled.div`
  width: 334px;
  margin-left: 0.4rem;
  margin-top: 1rem;
`;

export const InputBox = styled.div`
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

export const TypographyContent = styled(Typography)`
  display: flex;
  justify-content: center;
`;

export const ButtonBox = styled.div`
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

export const FieldIcon = styled.div`
  z-index: 2;
  border-radius: 7px;
  background-color: #ebebeb;
  width: 5.5rem;
  height: 2rem;

  font-size: 0.3rem;
  color: #7e9adb;
  text-align: center;
  line-height: 1.9rem;
  font-size: 0.5rem !important;

  position: relative;
  top: 20rem;
  left: 1.5rem !important;
`;

export const FieldIcon1 = styled(FieldIcon)`
  left: 8rem !important;
`;

export const FieldIcon2 = styled(FieldIcon)`
  left: 14.5rem !important;
`;

export const FieldLength = styled.div`
  z-index: 1;
  width: 2rem;
  height: ${(props) => props.$length * 11 + "px"};
  transform: scaleY(-1);
  transform-origin: top;
  background-color: #ffa2a2;
  border-radius: 7px;

  top: 20.3rem;
  left: 3.3rem !important;
`;

export const FieldLength1 = styled(FieldLength)`
  left: 9.8rem !important;
`;

export const FieldLength2 = styled(FieldLength)`
  left: 16.3rem !important;
`;
