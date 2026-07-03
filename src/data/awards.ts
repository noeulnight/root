export type Award = {
  slug: string;
  date: string;
  title: string;
  summary: string;
  highlight: boolean;
  organization?: string;
};

export const awards: Award[] = [
  {
    slug: "one-company-project-minister-award",
    date: "2023.11",
    title: "1인 1기업 프로젝트 중기부장관상",
    summary:
      "개인이 하나의 서비스·제품 아이템을 기획하고 사업화 가능성까지 증명하는 프로젝트형 경진 성격의 대회",
    highlight: true,
  },
  {
    slug: "worldskills-national-selection-cloud-computing-2023",
    date: "2023.07",
    title: "세계 기능경기대회 국가대표 선발전 3위",
    summary:
      "국제기능올림픽 출전 후보를 선발하기 위한 클라우드컴퓨팅 직종 실기 중심 선발전",
    highlight: true,
  },
  {
    slug: "national-skills-cloud-computing-silver-2022",
    date: "2022.08",
    title: "전국 기능경기대회 클라우드컴퓨팅부문 은메달",
    summary:
      "전국 단위 기능경기대회에서 클라우드 아키텍처 설계·배포·운영 역량을 겨루는 직종",
    highlight: true,
  },
  {
    slug: "smarteen-app-plus-challenge-2022",
    date: "2022.04 - 2022.11",
    title: "Smarteen App+ Challenge 2022 생활정보 부문 최우수상",
    summary:
      "청소년·학생 개발자가 생활 문제를 앱/서비스로 해결하는 아이디어와 구현력을 겨루는 앱 개발 챌린지",
    highlight: false,
  },
  {
    slug: "regional-skills-cloud-computing-silver-2022",
    date: "2022.04",
    title: "지방 기능경기대회 클라우드컴퓨팅부문 은상",
    summary:
      "전국기능경기대회 진출을 위한 지역 예선 성격의 클라우드컴퓨팅 실기 대회",
    highlight: false,
  },
  {
    slug: "regional-skills-cloud-computing-silver-2021",
    date: "2021.04",
    title: "지방 기능경기대회 클라우드컴퓨팅부문 은상",
    summary:
      "지역 단위에서 클라우드 인프라 구성과 운영 문제 해결 능력을 평가하는 기능경기대회",
    highlight: false,
  },
  {
    slug: "gyeongbuk-creative-convergence-hackathon-grand-prize-2020",
    date: "2020",
    title: "경상북도 창의융합 해커톤 최우수상",
    summary:
      "팀 단위로 지역·생활 문제를 발굴하고 제한 시간 안에 창의적인 해결안을 만드는 해커톤",
    highlight: false,
  },
  {
    slug: "gyeongbuk-creative-convergence-hackathon-excellence-2019",
    date: "2019",
    title: "경상북도 창의융합 해커톤 우수상",
    summary:
      "창의융합 주제에 맞춰 아이디어를 구체화하고 발표 가능한 결과물로 만드는 지역 해커톤",
    highlight: false,
  },
];
