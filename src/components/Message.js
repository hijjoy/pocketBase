import React, { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import { headers } from "../lib/headers";
import { MessageContainer } from "./Message.style";
import request from "../api/request";

const Message = () => {
  const [message, setMessage] = useState("🧐 배움이 있는 알찬 하루가 되기를 !");
  const [isEdit, setIsEdit] = useState(false);
  const [messageId, setMessageId] = useState();

  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    const filter = `user="${pb.authStore.model.id}"`;
    const fetchMessage = async () => {
      const res = await fetch(`${request.messages}/?filter=${filter}`, {
        headers: headers,
      });

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
        await fetch(request.messages, {
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
    await fetch(`${request.messages}/${messageId}`, {
      method: "PATCH",
      headers: headers,

      body: JSON.stringify(data),
    });

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
