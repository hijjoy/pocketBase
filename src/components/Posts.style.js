import styled from "styled-components";

export const PostsContaioner = styled.div`
  border-radius: 10px;
  border: 1px solid #cfcfcf;
  background: #fefefe;

  width: 333px;

  flex-shrink: 0;

  margin-top: 1rem;

  position: relative;
`;

export const NoPostsContaioner = styled(PostsContaioner)`
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

export const IconWrapper = styled.div`
  position: absolute;

  display: flex;
  flex-direction: row;
  align-items: center;

  left: 0.9rem;
  top: 0.8rem;
`;

export const Icon1 = styled.div`
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

export const Icon2 = styled(Icon1)`
  color: #70bdd5;
  background-color: #ddebf6;
`;

export const TextWrapper = styled.div`
  position: absolute;
  top: 3rem;
  left: 1rem;
  flex-shrink: 0;

  word-break: keep-all; /* text 줄 바꿀때 단어를 쪼개서 바꾸지 않게 */
  overflow-wrap: break-word; /* 칸 넘어가면 줄바꿈 강제  */

  padding-right: 2rem;
`;

export const TextBox = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export const TextBox2 = styled(TextBox)`
  margin-left: 0.4rem;
  margin-top: 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
`;
