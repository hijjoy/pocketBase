import dayjs from "dayjs";

export const aWeekago = () => {
  const date = dayjs().format("YYYY-MM-DD"); // 현재 날짜
  // 일주일 전의 날짜 계산
  const oneWeekAgo = new Date(date).getTime() - 7 * 24 * 60 * 60 * 1000;
  const oneWeekAgoDate = new Date(oneWeekAgo).toISOString().split("T")[0];

  return oneWeekAgoDate;
};
