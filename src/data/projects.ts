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
  overview: string;
  problem: string[];
  implementation: string[];
  outcomes: string[];
  links?: ProjectLink[];
};

export const projects: ProjectItem[] = [
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
    overview:
      "Oracle Cloud 기반 K3s 홈랩을 구축하고, GitOps·네트워크·관측 체계를 통합해 운영 자동화를 고도화한 프로젝트입니다.",
    problem: [
      "수동 배포 중심 운영으로 환경별 설정 불일치와 변경 이력 추적 어려움이 발생했습니다.",
      "평문 Secret 관리 방식으로 보안 리스크가 존재했습니다.",
      "클라우드/로컬 네트워크가 분리돼 공인 포트 개방 의존도가 높았습니다.",
      "리소스/애플리케이션/트래픽 지표가 분리되어 장애 선행 신호를 빠르게 파악하기 어려웠습니다.",
      "기존 NGINX Ingress 구조는 장기 운영 표준화와 확장성 측면에서 한계가 있었습니다.",
    ],
    implementation: [
      "Argo CD Pull 기반 GitOps 파이프라인을 구성해 Git 저장소를 Source of Truth로 전환했습니다.",
      "Sealed Secrets를 도입해 민감 정보를 암호화 상태로 Git에서 관리하고 클러스터 내부에서만 복호화되도록 구성했습니다.",
      "Helm 차트로 서비스별 배포 템플릿을 표준화하고 환경별 값을 분리했으며, GitHub PR Actions로 배포 사전 검증을 추가했습니다.",
      "Tailscale Overlay Network와 Operator, Subnet Route, Split DNS(Technitium + CoreDNS)로 클라우드/로컬 접근 경로를 통합했습니다.",
      "Prometheus + Grafana + Istio 메트릭 통합으로 관측 체계를 구축하고, NGINX Ingress에서 Istio Ambient 기반 Mesh 구조로 무중단 전환했습니다.",
    ],
    outcomes: [
      "수동 배포 제거율 95% 이상, 변경 이력 추적률 100%를 달성했습니다.",
      "Git revert 기반 롤백 시간을 평균 30분 수준에서 약 10분으로 단축했습니다.",
      "외부 개방 포트를 80/443 중심으로 축소하고 SSH 접근을 Tailnet 기반으로 표준화했습니다.",
      "클러스터/애플리케이션/트래픽 지표 통합 가시성을 확보해 장애 원인 파악 시간을 단축했습니다.",
      "Ingress 중심 구조에서 Mesh 기반 트래픽 통제 구조로 전환해 운영 일관성과 확장성을 강화했습니다.",
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
    overview:
      "전국기능경기대회 클라우드컴퓨팅부문 과제에 맞춰 AWS 관리형 서비스를 활용한 고가용성 아키텍처를 구축한 프로젝트입니다.",
    problem: [
      "대회 요구 조건에 맞는 Kubernetes 기반 고가용성 인프라를 제한된 시간 안에 정확히 구성해야 했습니다.",
      "네트워크 분리, 트래픽 분산, 배포 자동화까지 포함한 운영 가능 아키텍처가 필요했습니다.",
      "코드 변경 시 빌드부터 배포까지 이어지는 컨테이너 CI/CD 파이프라인 구성이 필요했습니다.",
    ],
    implementation: [
      "VPC를 Public/Private Subnet으로 분리하고 Bastion EC2를 구성했습니다.",
      "Amazon EKS + Managed Node Group 2개를 구성하고 애플리케이션별 Pod 2개 이상 배포 구조를 만들었습니다.",
      "ECR에 Docker 이미지를 관리하고 ALB로 트래픽 분산, CloudWatch 모니터링을 구성했습니다.",
      "CodeCommit/CodeBuild/CodeDeploy/CodePipeline으로 빌드-배포 자동화 체계를 구축했습니다.",
      "ECS 서비스 배포 자동화와 ALB, Route53 연동으로 엔드투엔드 배포 흐름을 완성했습니다.",
    ],
    outcomes: [
      "대회 요구사항을 만족하는 AWS 기반 고가용성 아키텍처를 완성했습니다.",
      "컨테이너 이미지 빌드부터 ECR 푸시, ECS 배포까지 자동화된 CI/CD 파이프라인을 구축했습니다.",
      "운영 가능한 모니터링 및 트래픽 분산 구조를 확보해 실전 대응력을 강화했습니다.",
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
    overview:
      "영상 업로드 이후 HLS 트랜스코딩과 암호화, 테넌트 단위 사용량 통제를 결합한 컨테이너 기반 처리 서비스입니다.",
    problem: [
      "HLS 변환/암호화는 CPU·메모리 집약 작업으로 대용량 처리 시 병목 리스크가 컸습니다.",
      "입력 포맷이 mp4가 아닐 경우 추가 변환 단계가 필요했습니다.",
      "ECS Task 종료 후 로그 추적 및 API Gateway 로그 로테이션 한계로 운영 추적성이 낮았습니다.",
      "테넌트별 사용량 추적과 유료 콘텐츠 접근 제어를 위한 키 관리 체계가 필요했습니다.",
    ],
    implementation: [
      "S3 원본 다운로드 후 mp4 여부를 판별하고 필요 시 변환/압축을 수행했습니다.",
      "FFmpeg 기반으로 HLS 트랜스코딩과 암호화 키 생성/적용을 구현하고 결과물을 S3에 업로드했습니다.",
      "GitHub -> CodeBuild -> ECR 기반 CI/CD를 구성하고 API Gateway aws service request로 ECS RunTask를 실행했습니다.",
      "ECS Task Definition(16vCPU/32GB)으로 워크로드 리소스를 명시하고 Usage Plan + API Key로 테넌트 추적 체계를 구성했습니다.",
      "S3 오리진 + CloudFront 캐싱, License API 권한 제어 엔드포인트를 구축했습니다.",
    ],
    outcomes: [
      "상시 인스턴스 운영을 제거하고 요청 기반 실행 구조로 유휴 비용을 절감했습니다.",
      "Usage Plan 기반 테넌트 요청 추적 및 리소스 통제가 가능해졌습니다.",
      "License API를 통해 유료 콘텐츠 열람 제한을 구현했습니다.",
      "컨테이너 기반 워크로드 분리로 서비스 영향도를 낮추고 운영 안정성을 확보했습니다.",
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
    overview:
      "로컬 전용 Proton Mail Bridge를 서버형 HTTP API로 확장하고, 멀티 아키텍처 빌드로 ARM 환경까지 지원한 프로젝트입니다.",
    problem: [
      "Proton Mail은 보안 구조 특성상 Bridge를 통해서만 SMTP/IMAP 중계가 가능해 클러스터 내부 연동에 제약이 있었습니다.",
      "기존 Bridge는 GUI/CLI 중심 로컬 애플리케이션이라 서버 환경 운영에 적합하지 않았습니다.",
      "클라우드/ARM 환경까지 고려한 배포 아키텍처 확장이 필요했습니다.",
    ],
    implementation: [
      "Bridge 코드를 포크해 계정 조회/관리용 HTTP API 엔드포인트를 추가했습니다.",
      "CLI 애플리케이션을 서버 환경에서 실행 가능한 컨테이너 구조로 전환했습니다.",
      "QEMU 기반 multi-arch 빌드 파이프라인을 도입해 ARM 이미지 빌드를 지원했습니다.",
      "클러스터 내부 서비스 연동 경로를 구성해 SMTP/IMAP 사용이 가능하도록 연결했습니다.",
    ],
    outcomes: [
      "Proton Mail Bridge를 서버형 API 서비스로 전환했습니다.",
      "클라우드 내부에서도 E2E 암호화 메일 연동이 가능한 운영 구조를 확보했습니다.",
      "ARM64 지원을 추가해 배포 대상 환경 호환성을 확대했습니다.",
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
    overview:
      "SSH remote port forwarding을 웹 도메인 라우팅과 세션 관측 기능으로 감싼 경량 터널 게이트웨이 서비스입니다.",
    problem: [
      "단순 SSH 포트 포워딩만으로는 어떤 세션이 어떤 포트를 열었는지 추적하기 어렵고, 사용자에게 연결 정보를 다시 전달하기도 불편했습니다.",
      "도메인 기반으로 터널을 노출하려면 세션별 host 매핑과 내부 포워드 대상 라우팅을 서버가 직접 관리해야 했습니다.",
      "운영 중인 터널의 HTTP/TCP 사용량과 오류를 보려면 별도 계측 지점이 필요했습니다.",
    ],
    implementation: [
      "NestJS 위에 ssh2 서버를 올려 SSH 연결마다 세션을 생성하고, tcpip-forward 요청 시 포트 풀에서 포트를 할당해 동적으로 바인딩했습니다.",
      "세션마다 랜덤 forward host를 발급하고 forwardHost.domain 형태의 요청을 http-proxy-middleware로 내부 포워드 포트에 연결했습니다.",
      "세션 조회 API와 SSE 이벤트 스트림을 구현해 연결, 포워드 추가·삭제, HTTP 요청 통계를 외부에서 실시간으로 구독할 수 있게 했습니다.",
      "HTTP 요청 수, 오류 수, 업·다운링크 바이트, TCP 연결 수를 세션 단위로 집계하고 snapshot 이벤트를 debounce해 상태 갱신 부담을 줄였습니다.",
      "비밀번호 인증 모드와 무인증 모드를 모두 지원하고, 호스트 키가 없으면 ED25519 키를 자동 생성하도록 구성했습니다.",
    ],
    outcomes: [
      "SSH 포트 포워딩을 단순 네트워크 기능이 아닌 운영 가능한 세션형 서비스로 전환했습니다.",
      "세션별 host/port 정보와 요청 통계를 즉시 확인할 수 있어 터널 상태 파악과 디버깅 속도를 높였습니다.",
      "tunnel.lth.so에서 재사용 가능한 경량 터널 백엔드 기반을 마련했습니다.",
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
    overview:
      "코레일 열차 운행 정보를 수집·정규화하고, 실시간 지도와 통계 화면으로 시각화한 철도 관제형 웹 서비스입니다.",
    problem: [
      "열차 운행 정보는 실시간 관제 관점에서 바로 활용하기 어려워, 위치와 지연 상태를 한 화면에서 보기 힘들었습니다.",
      "지도 화면과 통계 화면을 동시에 제공하려면 저지연 스트리밍과 시계열 집계를 함께 처리할 백엔드 구조가 필요했습니다.",
      "코레일 응답 포맷은 날짜/시간 표현이 불규칙하고, 열차 증감과 위치 변화를 안정적으로 추적하기 위한 정규화 계층이 필요했습니다.",
    ],
    implementation: [
      "백엔드에서 코레일 API를 5초 주기로 폴링하고, 열차 스냅샷과 이전 상태 diff를 계산해 생성·변경·제거 이벤트를 분리했습니다.",
      "초기 접속 시 최신 스냅샷을 먼저 보내고 이후 델타 이벤트를 이어 보내는 SSE 스트림을 구현해 지도 상태를 효율적으로 동기화했습니다.",
      "Prisma + PostgreSQL로 열차 스냅샷, 이벤트 로그, 시간대별 통계 테이블을 구성해 실시간 조회와 추세 분석을 함께 지원했습니다.",
      "React + Leaflet 프론트엔드에서 실시간 열차 위치를 지도에 표시하고, URL 기반 열차 선택과 추적, 다크 모드 전환을 지원했습니다.",
      "운행 수, 지연률, 열차 유형별 분포, 역별 활성도와 지연 현황을 차트와 테이블로 구성한 통계 대시보드를 별도 탭으로 제공했습니다.",
    ],
    outcomes: [
      "train.lth.so에서 전국 열차 위치와 지연 상태를 실시간으로 확인할 수 있는 서비스 운영 기반을 마련했습니다.",
      "스냅샷/델타 분리 구조로 지도 갱신 시 불필요한 전체 재렌더링을 줄이고, 실시간성 유지와 네트워크 효율을 함께 확보했습니다.",
      "실시간 지도뿐 아니라 누적 통계까지 한 서비스에 통합해 운영 현황 파악과 지연 추세 분석이 가능한 구조를 만들었습니다.",
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
