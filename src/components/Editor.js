import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../Pages/MainPage.style";
import { useDispatch, useSelector } from "react-redux";
import { pb } from "../lib/pocketbase";
import { headers } from "../lib/headers";
import { setContent, setQuestion, setTitle } from "../redux/postsSlice";
import * as E from "../components/Editor.style";

const Editor = ({ isEdit }) => {
  const date = useSelector((state) => state.date.date);

  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  const { title, content, question, field, id } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createPost = async () => {
    const data = {
      date: date,
      title: title,
      content: content,
      question: question,
      field: isClicked1
        ? "😊 완전 이해했어요"
        : isClicked2
        ? "😐조금 이해했어요"
        : "😥 잘 모르겠어요",
      user: pb.authStore.model.id,
    };

    await fetch("http://127.0.0.1:8090/api/collections/posts/records", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    navigate(-1, { replace: true });
  };

  const editPost = async () => {
    const data = {
      date: date,
      title: title,
      content: content,
      question: question,
      field: isClicked1
        ? "😊 완전 이해했어요"
        : isClicked2
        ? "😐조금 이해했어요"
        : "😥 잘 모르겠어요",
      user: pb.authStore.model.id,
    };
    await fetch(`http://127.0.0.1:8090/api/collections/posts/records/${id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    });

    navigate(-1, { replace: true });
  };

  return (
    <Container>
      <E.EditorHeaderWrapper>
        <img src="/images/nav.png" alt="nav" onClick={() => navigate(-1)} />
        <E.EditorWrapper>
          <E.EditLogoBox>
            <img src="/images/runrun.png" alt="logo" />
            {isEdit ? (
              <div>
                {pb.authStore.model.username} 님께서 <br />“{date}”에 공부하신
                내용을 수정해보세요 !
              </div>
            ) : (
              <div>
                {pb.authStore.model.username} 님께서 <br />“{date}”에 공부하신
                내용을 기록해보세요 !
              </div>
            )}
          </E.EditLogoBox>

          <E.EditorBox1>
            <img src="/images/title.png" alt="title" />
            <input
              type="text"
              name="title"
              onChange={(e) => dispatch(setTitle(e.target.value))}
              value={title}
            />
          </E.EditorBox1>
          <E.EditorBox2>
            <img src="/images/content.png" alt="content" />
            <textarea
              name="content"
              onChange={(e) => dispatch(setContent(e.target.value))}
              value={content}
            />
          </E.EditorBox2>
          <E.EditorBox3>
            <img src="/images/Q.png" alt="question" />
            <input
              type="text"
              name="question"
              onChange={(e) => dispatch(setQuestion(e.target.value))}
              value={question}
            />
          </E.EditorBox3>
          <E.PickBox>
            <E.PickBtn
              $clicked={isClicked1}
              onClick={() => {
                setIsClicked1(!isClicked1);
                setIsClicked2(false);
                setIsClicked3(false);
              }}
            >
              😊 완전 이해했어요
            </E.PickBtn>
            <E.PickBtn
              $clicked={isClicked2}
              onClick={() => {
                setIsClicked2(!isClicked2);
                setIsClicked1(false);
                setIsClicked3(false);
              }}
            >
              😐조금 이해했어요
            </E.PickBtn>
            <E.PickBtn
              $clicked={isClicked3}
              onClick={() => {
                setIsClicked3(!isClicked3);
                setIsClicked1(false);
                setIsClicked2(false);
              }}
            >
              😥 잘 모르겠어요
            </E.PickBtn>
          </E.PickBox>
          {isEdit ? (
            <E.SubmitBox onClick={editPost}>기록 수정하기</E.SubmitBox>
          ) : (
            <E.SubmitBox onClick={createPost}>공부 기록하기</E.SubmitBox>
          )}
        </E.EditorWrapper>
      </E.EditorHeaderWrapper>
    </Container>
  );
};

export default Editor;
