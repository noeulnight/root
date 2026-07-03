export type SkillCategory = {
  title: string;
  description: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Kubernetes & GitOps",
    description: "홈랩 클러스터 운영과 GitOps 기반 서비스 배포",
    skills: [
      "K3s",
      "Argo CD",
      "Helm",
      "Istio Ambient",
      "Tailscale",
      "Sealed Secrets",
      "Prometheus",
      "Grafana",
      "OCI",
    ],
  },
  {
    title: "Cloud & Delivery",
    description: "AWS 기반 아키텍처와 컨테이너 배포 파이프라인",
    skills: [
      "AWS VPC",
      "EKS",
      "ECS",
      "ECR",
      "ALB",
      "Route 53",
      "CloudFront",
      "S3",
      "API Gateway",
      "CodePipeline",
      "CodeBuild",
      "GitHub Actions",
      "Docker",
      "QEMU (multi-arch)",
    ],
  },
  {
    title: "Backend & Realtime",
    description: "TypeScript/Go 기반 API와 실시간 세션 처리",
    skills: [
      "TypeScript",
      "NestJS",
      "ExpressJS",
      "Go",
      "PostgreSQL",
      "Prisma",
      "SSE",
      "SSH2",
      "Reverse Proxy",
      "TCP Tunneling",
    ],
  },
  {
    title: "Frontend & Apps",
    description: "지도, 노트, macOS 앱 등 사용자-facing 도구 구현",
    skills: [
      "React",
      "Vite",
      "Leaflet",
      "Tailwind CSS",
      "Swift",
      "Obsidian Plugin",
    ],
  },
  {
    title: "Data & Media",
    description: "캐시, 미디어 처리, 데이터 전송 기술",
    skills: [
      "S3-compatible Cache",
      "HTTP Cache",
      "FFmpeg",
      "HLS",
      "GraphQL",
      "SMTP",
      "IMAP",
      "CloudWatch",
    ],
  },
];
