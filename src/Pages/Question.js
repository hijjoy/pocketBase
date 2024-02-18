import React, { useEffect, useState } from "react";
import { Container } from "./MainPage.style";
import { useNavigate } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import { useDispatch, useSelector } from "react-redux";
import FieldData from "../components/FieldData";
import { know } from "../util/know";
import { aWeekago } from "../util/aWeekAgo";
import request from "../api/request";
import { headers } from "../lib/headers";
import {
  setContent,
  setField,
  setId,
  setQuestion,
  setReset,
} from "../redux/postsSlice";

import * as E from "../components/Editor.style";
import * as Q from "./Question.style";

const Question = () => {
  const { field, question, content, id } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState();
  const [answerFin, setAnswerFin] = useState(false);

  const aweekagoDate = aWeekago();

  useEffect(() => {
    const fetchData = async () => {
      const filter = `user="${pb.authStore.model.id}"`;

      const res = await fetch(`${request.posts}?filter=${filter}`, {
        headers: headers,
      });
      const data = await res.json();
      const selectData = data.items.filter((e) => e.date === aweekagoDate);

      if (selectData.length > 0) {
        dispatch(setQuestion(selectData[0].question));
        dispatch(setContent(selectData[0].content));
        dispatch(setField(selectData[0].field));
        dispatch(setId(selectData[0].id));
      } else {
        dispatch(setReset());
        navigate(-1, { replace: true });
        alert("일주일 전 공부한 내용이 없습니다 😥");
      }
    };

    fetchData();
  }, [aweekagoDate]);

  const handleClickField = (newField) => {
    dispatch(setField(newField));
  };

  const handleEdit = async () => {
    const data = {
      field: field,
    };
    try {
      await fetch(`${request.posts}/${id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }

    navigate(-1, { replace: true });
  };
  if (!question) {
    return (
      <Container>
        <E.EditorHeaderWrapper>
          <Q.NoContentWrapper>
            <E.EditLogoBox>
              <img src="/images/runrun.png" alt="logo" />
              <div>
                {pb.authStore.model.username} 님께서 <br />
                일주일 전 공부한 내용이 없습니다 😥
              </div>
            </E.EditLogoBox>
          </Q.NoContentWrapper>
        </E.EditorHeaderWrapper>
      </Container>
    );
  } else {
    return (
      <Container>
        <E.EditorHeaderWrapper>
          <img src="/images/nav.png" alt="nav" onClick={() => navigate(-1)} />
          <E.EditorWrapper>
            <E.EditLogoBox>
              <img src="/images/runrun.png" alt="logo" />
              <div>
                {pb.authStore.model.username} 님께서 <br />
                일주일 전 공부한 내용에 대한 질문에 답해보세요 !
              </div>
            </E.EditLogoBox>
          </E.EditorWrapper>
        </E.EditorHeaderWrapper>
        <Q.QuestionContainer>
          <p>{aweekagoDate}</p>
          <Q.ChatBox>Q. {question}</Q.ChatBox>
          <Q.ChatBox2
            as="textarea"
            placeholder="여기에 답안을 작성해보며 생각을 정리해보세요! 작성후에는 Enter를 눌러 답을 확인하세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter" && answer.trim() !== "") {
                setAnswerFin(true);
              }
            }}
          ></Q.ChatBox2>
          {answerFin ? <Q.ChatBox3>{content}</Q.ChatBox3> : <></>}
        </Q.QuestionContainer>
        <Q.FieldText>
          일주일 전 공부한 내용에 대한
          <br />
          이해도가 바뀌었다면 다시 선택해주세요 !
        </Q.FieldText>
        <Q.FieldPick>
          {know.map((e) => (
            <FieldData
              key={e.id}
              description={e.description}
              click={handleClickField}
              isSelected={e.description === field}
            ></FieldData>
          ))}
        </Q.FieldPick>
        <Q.EditFieldButton onClick={handleEdit}>수정하기</Q.EditFieldButton>
      </Container>
    );
  }
};

export default Question;
