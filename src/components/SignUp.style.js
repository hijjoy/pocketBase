import { Button, Container, Grid, Input } from "@mui/material";
import styled from "styled-components";

export const UserContainer = styled(Container).attrs({
  as: "form", // Container를 form 요소로
})`
  margin-top: 13rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserGrid = styled(Grid)`
  border: 0.05rem solid #0062cc;
  border-radius: 5px;
  width: 20rem;
  height: 25rem;
`;

export const UserInput = styled(Input)`
  font-size: 0.95rem;
  margin-bottom: 1.1rem;
  margin-top: 0.2rem;
`;

export const UserButton = styled(Button)``;
