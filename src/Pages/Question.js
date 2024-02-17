import React from "react";
import { Container } from "./MainPage.style";
import { useNavigate } from "react-router-dom";

import * as E from "../components/Editor.style";

const Question = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <E.EditorHeaderWrapper>
        <img src="/images/nav.png" alt="nav" onClick={() => navigate(-1)} />
      </E.EditorHeaderWrapper>
    </Container>
  );
};

export default Question;
