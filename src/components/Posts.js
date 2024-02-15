import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pb } from "../lib/pocketbase";
import {
  setContent,
  setField,
  setId,
  setQuestion,
  setReset,
  setTitle,
} from "../redux/postsSlice";
import { useNavigate } from "react-router-dom";
import * as P from "./Posts.style";
import { headers } from "../lib/headers";
import request from "../api/request";

const Posts = () => {
  const date = useSelector((state) => state.date.date);
  const { title, content, field } = useSelector((state) => state.posts);

  const textBoxRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const filter = `user="${pb.authStore.model.id}"`;

      const res = await fetch(`${request.posts}?filter=${filter}`, {
        headers: headers,
      });
      const data = await res.json();

      const selectData = data.items.filter((e) => e.date === date);

      if (selectData.length > 0) {
        dispatch(setTitle(selectData[0].title));
        dispatch(setContent(selectData[0].content));
        dispatch(setQuestion(selectData[0].question));
        dispatch(setField(selectData[0].field));
        dispatch(setId(selectData[0].id));
      } else {
        dispatch(setReset());
      }
    };

    fetchData();
  }, [date, pb.authStore]);

  useEffect(() => {
    if (textBoxRef.current) {
      const textBoxHeight = textBoxRef.current.clientHeight + 70;

      const container = document.getElementById("PostsContaioner");
      if (container) {
        container.style.height = `${textBoxHeight}px`;
      }
    }
  }, [content, textBoxRef.current]);

  if (title === "") {
    return (
      <P.NoPostsContaioner>
        <h5> 오늘 공부한 내용을 기록해보세요 !</h5>
        <img
          src="/images/createBtn.png"
          alt="create"
          onClick={() => navigate(`/create/${date}`)}
        />
      </P.NoPostsContaioner>
    );
  } else {
    return (
      <P.PostsContaioner id="PostsContaioner">
        <div>
          <P.IconWrapper>
            <P.Icon1>{field}</P.Icon1>
            <P.Icon2>{date}</P.Icon2>
            <img
              src="/images/cut.png"
              alt="수정하기"
              onClick={() => navigate(`/edit/${date}`)}
            />
          </P.IconWrapper>
          <P.TextWrapper ref={textBoxRef}>
            <P.TextBox> 📍 {title}</P.TextBox>
            <P.TextBox2>{content}</P.TextBox2>
          </P.TextWrapper>
        </div>
      </P.PostsContaioner>
    );
  }
};

export default Posts;
