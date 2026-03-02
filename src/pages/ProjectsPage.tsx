import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectItem = {
  title: string;
  startDate: string;
  period: string;
  summary: string;
  stack: string[];
  highlights: string[];
  links?: ProjectLink[];
};

const projects: ProjectItem[] = [
  {
    title: "홈 서버 구축",
    startDate: "2025-08-01",
    period: "2025.08 ~ 진행 중",
    summary:
      "K3s 기반 GitOps 운영 표준화와 Istio Ambient/Tailscale 네트워크 통합을 수행한 개인 홈랩 인프라 프로젝트",
    stack: [
      "K3s",
      "Argo CD",
      "Helm",
      "Istio Ambient",
      "Tailscale",
      "Prometheus",
      "Grafana",
    ],
    highlights: [
      "수동 배포 95% 이상 제거",
      "롤백 시간 평균 30분→10분 단축",
      "트래픽/리소스 통합 가시성 확보",
    ],
    links: [
      { label: "Live", href: "https://arch.lth.so" },
      { label: "GitHub", href: "https://github.com/noeulnight/homelab" },
    ],
  },
  {
    title: "대회 아키텍처 배포",
    startDate: "2022-01-01",
    period: "2022",
    summary:
      "전국기능경기대회 클라우드컴퓨팅부문 대응을 위한 AWS 기반 고가용성 아키텍처 배포",
    stack: ["AWS VPC", "EKS", "ECR", "ALB", "CloudWatch", "CodePipeline", "ECS"],
    highlights: [
      "대회 요구 아키텍처 완성",
      "컨테이너 자동 배포 파이프라인 구성",
      "고가용성 운영 구조 구축",
    ],
  },
  {
    title: "미디어 트랜스코딩 서비스 구축",
    startDate: "2025-09-22",
    period: "2025.09.22 ~ 2025.09.25",
    summary:
      "영상 HLS 트랜스코딩/암호화와 테넌트별 사용량 통제를 위한 컨테이너 기반 처리 서비스",
    stack: [
      "API Gateway",
      "ECS",
      "S3",
      "CloudFront",
      "TypeScript",
      "NestJS",
      "FFmpeg",
    ],
    highlights: [
      "요청 기반 실행으로 유휴 비용 절감",
      "Usage Plan 기반 테넌트 추적",
      "License API로 유료 콘텐츠 접근 제어",
    ],
  },
  {
    title: "Proton Mail Bridge Web API 구현",
    startDate: "2026-02-01",
    period: "2026.02",
    summary:
      "Proton Mail Bridge를 서버형 HTTP API로 확장해 클러스터 내부 SMTP/IMAP 연동을 가능하게 한 프로젝트",
    stack: ["K3s", "Argo CD", "Docker", "QEMU (multi-arch)"],
    highlights: [
      "서버형 API 전환",
      "ARM64 지원 추가",
      "클라우드 환경 E2E 암호화 메일 연동",
    ],
    links: [
      { label: "Live", href: "https://bridge.lth.so" },
      { label: "GitHub", href: "https://github.com/noeulnight/bridge" },
    ],
  },
];

const projectsByStartDateDesc = [...projects].sort(
  (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
);

export function ProjectsPage() {
  return (
    <div className="grid gap-2 sm:grid-cols-12">
      {projectsByStartDateDesc.map((project) => (
        <Card key={project.title} className="sm:col-span-12">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>
              {project.period} · {project.summary}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={`${project.title}-${tech}`}
                  className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <ul className="mt-3 grid gap-1 text-sm text-muted-foreground">
              {project.highlights.map((highlight) => (
                <li key={`${project.title}-${highlight}`} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {project.links?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={`${project.title}-${link.label}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
