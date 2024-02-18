import styled from "styled-components";
import { PostsContaioner } from "../components/Posts.style";
import { PickBox } from "../components/Editor.style";

export const QuestionContainer = styled(PostsContaioner)`
  width: 333px;
  height: 470px;

  position: relative;
  top: 5rem;

  p {
    max-width: max-content;
    padding: 4px 11px;
    font-size: 0.6rem;
    border-radius: 40px;
    background: #e3e3e3;

    position: relative;
    top: 0.5rem;
    left: 7.5rem;
  }
`;

export const FieldPick = styled(PickBox)`
  position: relative;
  top: 10rem;
`;

export const ChatBox = styled.div`
  position: relative;
  top: 1rem;
  left: 1rem;
  display: flex;
  padding: 0.5rem 0.85rem;

  overflow: auto;

  width: 180px;
  min-height: 15px;
  max-height: 60px;

  background-color: #bcc6e2;
  border-radius: 10px;

  z-index: 1;

  font-size: 0.65rem;
  font-weight: 600;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

export const ChatBox2 = styled(ChatBox)`
  background-color: #ebebeb;
  top: 2rem;
  left: 6.5rem;
  padding: 1rem;

  min-height: 100px;

  cursor: pointer;
  border: none;
`;

export const ChatBox3 = styled(ChatBox)`
  top: 3rem;
  height: 100px;
  min-height: 150px;
  overflow: auto;
`;

export const FieldText = styled.h5`
  position: absolute;
  top: 39.8rem;
  text-align: center;
`;

export const EditFieldButton = styled.button`
  position: absolute;
  top: 48rem;

  border: none;
  border-radius: 5px;
  width: 333px;
  height: 47px;
  background: #697082;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const NoContentWrapper = styled.div`
  position: absolute;
  top: 10rem;
  left: 1rem;
`;
