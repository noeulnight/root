export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  startDate: string;
  period: string;
  summary: string;
  stack: string[];
  highlights: string[];
  links?: ProjectLink[];
};

export const projects: ProjectItem[] = [
  {
    slug: "osmproxy",
    title: "OpenStreetMap 타일 프록시 구축",
    startDate: "2026-04-30",
    period: "2026.04.30 ~ 2026.05.03",
    summary:
      "OpenStreetMap slippy-map 타일을 S3 호환 스토리지에 캐싱해 반복 요청 지연과 upstream 의존도를 줄이는 HTTP 프록시",
    stack: [
      "TypeScript",
      "ExpressJS",
      "S3",
      "Docker",
      "OpenStreetMap",
      "HTTP Cache",
    ],
    highlights: [
      "S3 호환 타일 캐시",
      "stale cache 백그라운드 갱신",
      "warm-cache 기준 upstream 대비 37배 이상 응답 개선",
    ],
    links: [
      { label: "Live", href: "https://osm.lth.so" },
      { label: "GitHub", href: "https://github.com/noeulnight/osmproxy" },
    ],
  },
  {
    slug: "home-server",
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
    slug: "competition-architecture",
    title: "대회 아키텍처 배포",
    startDate: "2022-01-01",
    period: "2022",
    summary:
      "전국기능경기대회 클라우드컴퓨팅부문 대응을 위한 AWS 기반 고가용성 아키텍처 배포",
    stack: [
      "AWS VPC",
      "EKS",
      "ECR",
      "ALB",
      "CloudWatch",
      "CodePipeline",
      "ECS",
    ],
    highlights: [
      "대회 요구 아키텍처 완성",
      "컨테이너 자동 배포 파이프라인 구성",
      "고가용성 운영 구조 구축",
    ],
  },
  {
    slug: "media-transcoding",
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
    slug: "proton-bridge-web-api",
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
  {
    slug: "hole-tunnel-service",
    title: "세션 기반 SSH 터널 게이트웨이 구축",
    startDate: "2026-03-04",
    period: "2026.03.04 ~ 2026.03.05",
    summary:
      "SSH remote port forwarding을 세션·도메인 라우팅·트래픽 계측과 결합해 tunnel.lth.so에서 운영 가능한 터널 서비스로 구현한 프로젝트",
    stack: [
      "NestJS",
      "TypeScript",
      "SSH2",
      "SSE",
      "http-proxy-middleware",
      "Joi",
      "Docker",
    ],
    highlights: [
      "세션별 랜덤 forward host 발급",
      "HTTP/TCP 트래픽 실시간 계측",
      "SSH 인증 모드와 호스트 키 자동 생성 지원",
    ],
    links: [
      { label: "Live", href: "https://tunnel.lth.so" },
      {
        label: "Monitoring",
        href: "https://monitoring.lth.so/d/hole-backend-overview/hole?orgId=1&from=now-6h&to=now&timezone=browser&refresh=10s",
      },
      { label: "GitHub", href: "https://github.com/noeulnight/hole" },
    ],
  },
  {
    slug: "railroad-live-map",
    title: "코레일 실시간 지도 및 통계 서비스 구축",
    startDate: "2026-03-09",
    period: "2026.03.09 ~ 2026.03.12",
    summary:
      "코레일 기차 데이터를 5초 단위로 수집해 train.lth.so에서 실시간 지도와 운행 통계를 제공하는 서비스",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Leaflet",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "SSE",
    ],
    highlights: [
      "5초 폴링 기반 실시간 열차 추적",
      "SSE 스냅샷/델타 스트림으로 지도 동기화",
      "역별·유형별 지연 통계 대시보드 제공",
    ],
    links: [
      { label: "Live", href: "https://train.lth.so" },
      { label: "GitHub", href: "https://github.com/noeulnight/railroad" },
    ],
  },
];

export const projectsByStartDateDesc = [...projects].sort(
  (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
);
