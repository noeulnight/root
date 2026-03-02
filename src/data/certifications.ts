export type Certification = {
  name: string;
  acquiredDate: string;
  validUntil?: string;
  credentialId?: string;
};

export const certifications: Certification[] = [
  {
    name: "정보처리산업기사",
    acquiredDate: "2022.12.23",
  },
  {
    name: "정보처리기능사",
    acquiredDate: "2021.07.16",
  },
  {
    name: "AWS Solution Architect Associate",
    acquiredDate: "2022.02.04",
    validUntil: "2025.02.04",
    credentialId: "H951ELMBMJQE14G2",
  },
];
