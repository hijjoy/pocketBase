import styled from "styled-components";
import { Icon1, PostsContaioner } from "./Posts.style";
import { HeaderWrapper } from "../Pages/MainPage.style";

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EditorHeaderWrapper = styled(HeaderWrapper)`
  margin-top: 1rem;
  margin-right: 20rem;

  position: relative;
`;

export const EditLogoBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  width: 333px;

  position: absolute;
  top: 2.5rem;
  left: 1.4rem;

  img {
    margin-right: 1.3rem;
  }

  div {
    letter-spacing: -0.2px;
    line-height: 21px; // 글자 상하 간격
    font-size: 0.7rem;
    font-weight: bold;
  }
`;

export const EditorBox1 = styled(PostsContaioner)`
  position: absolute;
  top: 6rem;
  left: 0.25rem;

  height: 104px;

  img {
    position: absolute;
    top: 0.8rem;
    left: 8.5rem;
  }

  input {
    border: none;
    outline: none;
    border-bottom: 1px solid #cfcfcf;
    width: 268px;

    position: absolute;
    top: 4rem;
    left: 2rem;

    font-weight: 600;
  }
`;

export const EditorBox2 = styled(EditorBox1)`
  top: 13.5rem;
  height: 222px;

  img {
    left: 7.5rem;
  }

  textarea {
    border: none;
    outline: none;
    border-bottom: 1px solid #cfcfcf;

    position: absolute;
    top: 4.5rem;
    left: 2rem;

    width: 265px;
    height: 110px;
  }
`;

export const EditorBox3 = styled(EditorBox1)`
  top: 28.3rem;
`;

export const PickBox = styled.div`
  position: absolute;
  top: 36.8rem;
  left: 0.38rem;

  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const PickBtn = styled(Icon1)`
  background-color: ${(props) => (props.$clicked ? "#DEE3F3" : "#EBEBEB")};
  width: 105.5px;
  height: 44px;

  font-size: 0.6rem;
  line-height: 2.6rem;
`;

export const SubmitBox = styled(Icon1)`
  position: absolute;
  top: 40.5rem;
  left: 0.38rem;

  width: 333px;
  height: 47px;
  flex-shrink: 0;
  color: #fff;
  background: #697082;

  font-size: 0.8rem;
  line-height: 2.8rem;
`;
