import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pb } from "../lib/pocketbase";
import { setPosts } from "../redux/postsSlice";

const TILdata = () => {
  const date = useSelector((state) => state.date.date);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

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
      //setPosts(selectData);
    };

    fetchData();
  }, [date, pb.authStore]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div> {post.content}</div>
          <div> {post.question}</div>
          <div> {post.field}</div>
        </div>
      ))}
    </div>
  );
};

export default TILdata;
