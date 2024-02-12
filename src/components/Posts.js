import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pb } from "../lib/pocketbase";
import { setPosts } from "../redux/postsSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const date = useSelector((state) => state.date.date);
  const posts = useSelector((state) => state.posts);

  const textBoxRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      Authorization: process.env.REACT_APP_AUTH_TOKEN,
    };

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
      <NoPostsContaioner>
        <h5> 오늘 공부한 내용을 기록해보세요 !</h5>
        <img
          src="/images/createBtn.png"
          alt="create"
          onClick={() => navigate("/create")}
        />
      </NoPostsContaioner>
    );
  } else {
    return (
      <PostsContaioner id="PostsContaioner">
        {posts.map((post) => (
          <div key={post.id}>
            <IconWrapper>
              <Icon1>{post.field}</Icon1>
              <Icon2>{post.date}</Icon2>
            </IconWrapper>
            <TextWrapper ref={textBoxRef}>
              <TextBox> 📍 {post.title}</TextBox>
              <TextBox2>{post.content}</TextBox2>
            </TextWrapper>
          </div>
        ))}
      </PostsContaioner>
    );
  }
};

export default Posts;

const PostsContaioner = styled.div`
  border-radius: 10px;
  border: 1px solid #cfcfcf;
  background: #fefefe;

  width: 333px;

  flex-shrink: 0;

  margin-top: 1rem;

  position: relative;
`;

const NoPostsContaioner = styled(PostsContaioner)`
  height: 95px;
  h5 {
    position: absolute;
    left: 5rem;
  }

  img {
    position: absolute;
    top: 3rem;
    left: 8rem;
  }
`;

const IconWrapper = styled.div`
  position: absolute;

  display: flex;
  flex-direction: row;
  align-items: center;

  left: 0.9rem;
  top: 0.8rem;
`;

const Icon1 = styled.div`
  flex-shrink: 0;
  width: 4rem;
  height: 22px;
  border-radius: 7px;
  background-color: #dee3f3;

  color: #7e9adb;
  font-weight: bold;
  text-align: center;
  line-height: 22px;
  font-size: 0.4rem;

  margin-right: 0.5rem;
`;

const Icon2 = styled(Icon1)`
  color: #70bdd5;
  background-color: #ddebf6;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 3rem;
  left: 1rem;
  flex-shrink: 0;

  word-break: keep-all; /* text 줄 바꿀때 단어를 쪼개서 바꾸지 않게 */
  overflow-wrap: break-word; /* 칸 넘어가면 줄바꿈 강제  */

  padding-right: 2rem;
`;

const TextBox = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const TextBox2 = styled(TextBox)`
  margin-left: 0.4rem;
  margin-top: 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
`;
