import React from "react";
import styled from "styled-components";

const Message = () => {
  return (
    <MessageContainer>
      <div>🧐 배움이 있는 알찬 하루가 되기를 !</div>
      <img src="/images/pen.png" alt="pen" />
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
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
`;
