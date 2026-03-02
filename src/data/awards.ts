export type Award = {
  date: string;
  title: string;
  organization?: string;
};

export const awards: Award[] = [
  {
    date: "2023.11",
    title: "1인 1기업 프로젝트 중기부장관상",
  },
  {
    date: "2023.07",
    title: "세계 기능경기대회 국가대표 선발전 3위",
  },
  {
    date: "2022.08",
    title: "전국 기능경기대회 클라우드컴퓨팅부문 은메달",
  },
  {
    date: "2022.04 - 2022.11",
    title: "Smarteen App+ Challenge 2022 생활정보 부문 최우수상",
  },
  {
    date: "2022.04",
    title: "지방 기능경기대회 클라우드컴퓨팅부문 은상",
  },
  {
    date: "2021.04",
    title: "지방 기능경기대회 클라우드컴퓨팅부문 은상",
  },
  {
    date: "2020",
    title: "경상북도 창의융합 해커톤 최우수상",
  },
  {
    date: "2019",
    title: "경상북도 창의융합 해커톤 우수상",
  },
];
