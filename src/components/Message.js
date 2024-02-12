import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { pb } from "../lib/pocketbase";
import { headers } from "../lib/headers";

const Message = () => {
  const [message, setMessage] = useState("🧐 배움이 있는 알찬 하루가 되기를 !");
  const [isEdit, setIsEdit] = useState(false);
  const [messageId, setMessageId] = useState();

  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    const filter = `user="${pb.authStore.model.id}"`;
    const fetchMessage = async () => {
      const res = await fetch(
        `http://127.0.0.1:8090/api/collections/messages/records/?filter=${filter}`,
        { headers: headers }
      );

      const data = await res.json();
      const selectData = data.items.map((e) => e.message);

      if (selectData.length > 0) {
        setMessageId(data.items.map((e) => e.id));
        setMessage(selectData.join(""));
      } else {
        const createData = {
          message: message,
          user: pb.authStore.model.id,
        };
        await fetch("http://127.0.0.1:8090/api/collections/messages/records", {
          method: "POST",

          headers: headers,
          body: JSON.stringify(createData),
        });

        fetchMessage();
      }
    };
    fetchMessage();
  }, [pb.authStore]);

  const updateMessage = async () => {
    if (editMessage.length === 0) {
      setIsEdit(!isEdit);
      return;
    }
    const data = {
      message: editMessage,
      user: pb.authStore.model.id,
    };
    await fetch(
      `http://127.0.0.1:8090/api/collections/messages/records/${messageId}`,
      {
        method: "PATCH",
        headers: headers,

        body: JSON.stringify(data),
      }
    );

    setMessage(editMessage);
    setIsEdit(!isEdit);
  };

  return (
    <MessageContainer>
      <div>
        {isEdit ? (
          <input
            type="text"
            onChange={(e) => setEditMessage(e.target.value)}
            placeholder={message}
          />
        ) : (
          message
        )}
      </div>
      {isEdit ? (
        <img
          src="/images/check.png"
          alt="save"
          onClick={() => updateMessage()}
        />
      ) : (
        <img
          src="/images/pen.png"
          alt="pen"
          onClick={() => setIsEdit(!isEdit)}
        />
      )}
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
