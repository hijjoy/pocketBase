import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pb } from "../lib/pocketbase";
import { setPosts } from "../redux/postsSlice";
import { useNavigate } from "react-router-dom";
import * as P from "./Posts.style";
import { headers } from "../lib/headers";

const Posts = () => {
  const date = useSelector((state) => state.date.date);
  const posts = useSelector((state) => state.posts);

  const textBoxRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const filter = `user="${pb.authStore.model.id}"`;

      const res = await fetch(
        `http://127.0.0.1:8090/api/collections/posts/records?filter=${filter}`,
        { headers: headers }
      );
      const data = await res.json();

      const selectData = data.items.filter((e) => e.date === date);
      dispatch(setPosts(selectData));
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
  }, [posts, textBoxRef.current]);

  if (posts.length === 0) {
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
        {posts.map((post) => (
          <div key={post.id}>
            <P.IconWrapper>
              <P.Icon1>{post.field}</P.Icon1>
              <P.Icon2>{post.date}</P.Icon2>
            </P.IconWrapper>
            <P.TextWrapper ref={textBoxRef}>
              <P.TextBox> 📍 {post.title}</P.TextBox>
              <P.TextBox2>{post.content}</P.TextBox2>
            </P.TextWrapper>
          </div>
        ))}
      </P.PostsContaioner>
    );
  }
};

export default Posts;
