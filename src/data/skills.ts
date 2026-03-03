export type SkillCategory = {
  title: string;
  description: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Infrastructure",
    description: "컨테이너 오케스트레이션과 클라우드 인프라 운영",
    skills: ["K3s", "EKS", "ECS", "AWS VPC", "Docker", "QEMU (multi-arch)"],
  },
  {
    title: "Delivery & Traffic",
    description: "배포 자동화와 트래픽 제어",
    skills: [
      "Argo CD",
      "Helm",
      "CodePipeline",
      "API Gateway",
      "ALB",
      "CloudFront",
      "Istio Ambient",
      "Tailscale",
    ],
  },
  {
    title: "Observability",
    description: "모니터링과 운영 가시성",
    skills: ["Prometheus", "Grafana", "CloudWatch"],
  },
  {
    title: "Application",
    description: "서비스 구현",
    skills: ["TypeScript", "NestJS", "ExpressJS"],
  },
];
