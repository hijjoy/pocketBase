import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, HeaderWrapper } from "../Pages/MainPage.style";
import { Icon1, PostsContaioner } from "./Posts.style";
import { useDispatch, useSelector } from "react-redux";
import { pb } from "../lib/pocketbase";
import { headers } from "../lib/headers";
import { setContent, setQuestion, setTitle } from "../redux/postsSlice";

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
      <EditorHeaderWrapper>
        <img src="/images/nav.png" alt="nav" onClick={() => navigate(-1)} />
        <EditorWrapper>
          <EditLogoBox>
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
          </EditLogoBox>

          <EditorBox1>
            <img src="/images/title.png" alt="title" />
            <input
              type="text"
              name="title"
              onChange={(e) => dispatch(setTitle(e.target.value))}
              value={title}
            />
          </EditorBox1>
          <EditorBox2>
            <img src="/images/content.png" alt="content" />
            <textarea
              name="content"
              onChange={(e) => dispatch(setContent(e.target.value))}
              value={content}
            />
          </EditorBox2>
          <EditorBox3>
            <img src="/images/Q.png" alt="question" />
            <input
              type="text"
              name="question"
              onChange={(e) => dispatch(setQuestion(e.target.value))}
              value={question}
            />
          </EditorBox3>
          <PickBox>
            <PickBtn
              $clicked={isClicked1}
              onClick={() => {
                setIsClicked1(!isClicked1);
                setIsClicked2(false);
                setIsClicked3(false);
              }}
            >
              😊 완전 이해했어요
            </PickBtn>
            <PickBtn
              $clicked={isClicked2}
              onClick={() => {
                setIsClicked2(!isClicked2);
                setIsClicked1(false);
                setIsClicked3(false);
              }}
            >
              😐조금 이해했어요
            </PickBtn>
            <PickBtn
              $clicked={isClicked3}
              onClick={() => {
                setIsClicked3(!isClicked3);
                setIsClicked1(false);
                setIsClicked2(false);
              }}
            >
              😥 잘 모르겠어요
            </PickBtn>
          </PickBox>
          {isEdit ? (
            <SubmitBox onClick={editPost}>기록 수정하기</SubmitBox>
          ) : (
            <SubmitBox onClick={createPost}>공부 기록하기</SubmitBox>
          )}
        </EditorWrapper>
      </EditorHeaderWrapper>
    </Container>
  );
};

export default Editor;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EditorHeaderWrapper = styled(HeaderWrapper)`
  margin-top: 1rem;
  margin-right: 20rem;

  position: relative;
`;

const EditLogoBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  width: 333px;

  position: absolute;
  top: 2.5rem;
  left: 1.4rem;

  img {
    margin-right: 1.3rem;
  }

  div {
    letter-spacing: -0.2px;
    line-height: 21px; // 글자 상하 간격
    font-size: 0.7rem;
    font-weight: bold;
  }
`;

const EditorBox1 = styled(PostsContaioner)`
  position: absolute;
  top: 6rem;
  left: 0.25rem;

  height: 104px;

  img {
    position: absolute;
    top: 0.8rem;
    left: 8.5rem;
  }

  input {
    border: none;
    outline: none;
    border-bottom: 1px solid #cfcfcf;
    width: 268px;

    position: absolute;
    top: 4rem;
    left: 2rem;

    font-weight: 600;
  }
`;

const EditorBox2 = styled(EditorBox1)`
  top: 13.5rem;
  height: 222px;

  img {
    left: 7.5rem;
  }

  textarea {
    border: none;
    outline: none;
    border-bottom: 1px solid #cfcfcf;

    position: absolute;
    top: 4.5rem;
    left: 2rem;

    width: 265px;
    height: 110px;
  }
`;

const EditorBox3 = styled(EditorBox1)`
  top: 28.3rem;
`;

const PickBox = styled.div`
  position: absolute;
  top: 36.8rem;
  left: 0.38rem;

  display: flex;
  align-items: center;
  flex-direction: row;
`;

const PickBtn = styled(Icon1)`
  background-color: ${(props) => (props.$clicked ? "#DEE3F3" : "#EBEBEB")};
  width: 105.5px;
  height: 44px;

  font-size: 0.6rem;
  line-height: 2.6rem;
`;

const SubmitBox = styled(Icon1)`
  position: absolute;
  top: 40.5rem;
  left: 0.38rem;

  width: 333px;
  height: 47px;
  flex-shrink: 0;
  color: #fff;
  background: #697082;

  font-size: 0.8rem;
  line-height: 2.8rem;
`;
