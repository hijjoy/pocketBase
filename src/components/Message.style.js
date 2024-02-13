import styled from "styled-components";

export const MessageContainer = styled.div`
  border-radius: 10px;
  background: #98a6cd;
  width: 339px;
  height: 47px;
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  color: #fff;
  text-align: center;
  position: relative;

  div {
    position: absolute;
    left: 1.1rem;
    font-weight: bold;
    color: #fff;
    font-size: 0.8rem;
  }

  img {
    position: absolute;
    right: 1.1rem;
  }

  input {
    border: none;
    background-color: #98a6cd;
    outline: none; // focus시 outline 제거
    border-bottom: 1px solid #ddebf6;

    width: 200px;

    color: #fff;
    font-weight: bold;
  }
`;
