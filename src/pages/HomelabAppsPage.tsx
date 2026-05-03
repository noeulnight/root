import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Lock, LockOpen } from "lucide-react";

type HomelabAppMeta = {
  manifestPath: string;
  label: string;
  namespace: string;
  description: string;
  serviceUrl?: string;
  visibility: boolean;
};

const BADGES_PREVIEW = [
  { label: "nodes", src: "https://badges.lth.so/badge/cluster/nodes" },
  { label: "pods", src: "https://badges.lth.so/badge/cluster/pods" },
  {
    label: "deployments",
    src: "https://badges.lth.so/badge/cluster/deployments",
  },
  {
    label: "namespaces",
    src: "https://badges.lth.so/badge/cluster/namespaces",
  },
] as const;

const APP_META: HomelabAppMeta[] = [
  {
    manifestPath: "apps/architecture.yml",
    label: "architecture",
    namespace: "architecture",
    description: "홈랩 토폴로지와 운영 구성을 시각화하는 공개 아키텍처 페이지입니다.",
    serviceUrl: "https://arch.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/argocd.yml",
    label: "argocd",
    namespace: "argocd",
    description:
      "GitOps 기반 선언형 배포를 관리하는 Argo CD 컨트롤 플레인입니다.",
    serviceUrl: "https://argo.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/authentik.yml",
    label: "authentik",
    namespace: "authentik",
    description: "SSO와 인증/인가를 담당하는 IdP 서비스입니다.",
    serviceUrl: "https://auth.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/badges.yml",
    label: "badges",
    namespace: "badges",
    description: "서비스 상태와 버전 배지를 생성해 노출하는 앱입니다.",
    serviceUrl: "https://badges.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/coder.yml",
    label: "coder",
    namespace: "coder",
    description: "브라우저 기반 원격 개발 환경을 제공하는 서비스입니다.",
    serviceUrl: "https://coder.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/grafana.yml",
    label: "grafana",
    namespace: "grafana",
    description: "메트릭과 로그를 시각화하는 대시보드 서비스입니다.",
    serviceUrl: "https://monitoring.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/kiali.yml",
    label: "kiali",
    namespace: "kiali",
    description: "서비스 메시 트래픽 흐름을 시각화하는 Kiali입니다.",
    serviceUrl: "https://kiali.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/kube-visualizer.yml",
    label: "kube-visualizer",
    namespace: "kube-visualizer",
    description: "클러스터 리소스 배치와 상태를 시각화하는 도구입니다.",
    serviceUrl: "https://visualized.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/korail.yml",
    label: "korail",
    namespace: "korail",
    description: "코레일 실시간 열차 위치와 운행 상태를 제공하는 서비스입니다.",
    serviceUrl: "https://korail.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/memos.yml",
    label: "memos",
    namespace: "memos",
    description: "개인 메모와 짧은 기록을 관리하는 공개 메모 서비스입니다.",
    serviceUrl: "https://memo.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/op-share.yml",
    label: "op-share",
    namespace: "op-share",
    description: "공유용 운영 도구와 링크를 제공하는 홈랩 애플리케이션입니다.",
    serviceUrl: "https://op.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/remodex.yml",
    label: "remodex",
    namespace: "remodex",
    description: "원격 입력과 실시간 상태를 중계하는 웹 서비스입니다.",
    serviceUrl: "https://remodex.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/root.yml",
    label: "root",
    namespace: "root",
    description: "포트폴리오와 홈랩 서비스를 연결하는 메인 웹사이트입니다.",
    serviceUrl: "https://lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/roundcube.yml",
    label: "roundcube",
    namespace: "roundcube",
    description: "브라우저에서 메일을 사용할 수 있는 Roundcube 웹메일입니다.",
    serviceUrl: "https://mail.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/slash.yml",
    label: "slash",
    namespace: "slash",
    description: "단축 도메인 서비스를 제공하는 Slash 서비스입니다.",
    serviceUrl: "https://s.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/spotify.yml",
    label: "spotify",
    namespace: "spotify",
    description: "Spotify 연동 데이터를 제공하는 서비스입니다.",
    serviceUrl: "https://spotify.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/termix.yml",
    label: "termix",
    namespace: "termix",
    description: "브라우저에서 터미널 기반 관리 작업을 수행하는 공개 도구입니다.",
    serviceUrl: "https://termix.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/wakapi.yml",
    label: "wakapi",
    namespace: "wakapi",
    description: "코딩 활동 시간을 수집하고 시각화하는 Wakapi입니다.",
    serviceUrl: "https://wakatime.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/bridge.yml",
    label: "bridge",
    namespace: "bridge",
    description: "클러스터 내부 SMTP/IMAP 연동을 위한 Proton Mail Bridge 서비스입니다.",
    visibility: false,
  },
  {
    manifestPath: "cert-manager/",
    label: "cert-manager",
    namespace: "cert-manager",
    description: "TLS 인증서 발급과 갱신을 자동화하는 인증서 관리 계층입니다.",
    visibility: false,
  },
  {
    manifestPath: "database/mongo/",
    label: "mongo",
    namespace: "mongo",
    description: "문서형 데이터를 저장하는 MongoDB 데이터베이스입니다.",
    visibility: false,
  },
  {
    manifestPath: "database/mysql/",
    label: "mysql",
    namespace: "mysql",
    description: "관계형 데이터를 저장하는 MySQL 데이터베이스입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/n8n.yml",
    label: "n8n",
    namespace: "n8n",
    description: "워크플로 자동화와 서비스 연동을 위한 n8n입니다.",
    visibility: false,
  },
  {
    manifestPath: "database/postgres/",
    label: "postgres",
    namespace: "postgres",
    description: "서비스별 영속 데이터를 저장하는 PostgreSQL 데이터베이스입니다.",
    visibility: false,
  },
  {
    manifestPath: "prometheus/",
    label: "prometheus",
    namespace: "prometheus",
    description: "클러스터와 서비스 메트릭을 수집하는 관측 스택입니다.",
    visibility: false,
  },
  {
    manifestPath: "database/redis/",
    label: "redis",
    namespace: "redis",
    description: "캐시와 큐성 워크로드에 사용하는 Redis 데이터 저장소입니다.",
    visibility: false,
  },
  {
    manifestPath: "sealed-secrets/",
    label: "sealed-secrets",
    namespace: "kube-system",
    description: "Git에 암호화된 Secret을 저장하기 위한 Sealed Secrets 컨트롤러입니다.",
    visibility: false,
  },
  {
    manifestPath: "tailscale/",
    label: "tailscale",
    namespace: "tailscale",
    description: "Tailnet 기반 사설 접근, subnet route, split DNS를 제공하는 네트워크 계층입니다.",
    visibility: false,
  },
  {
    manifestPath: "technitium/",
    label: "technitium",
    namespace: "technitium",
    description: "내부 DNS 및 도메인 해석을 담당하는 DNS 서버입니다.",
    visibility: false,
  },
  {
    manifestPath: "istio-ingress/",
    label: "istio-ingress",
    namespace: "istio-ingress",
    description: "외부 HTTP 트래픽을 클러스터 내부 서비스로 전달하는 ingress gateway입니다.",
    visibility: false,
  },
  {
    manifestPath: "istio/base/",
    label: "istio-base",
    namespace: "istio-system",
    description: "Istio CRD와 기본 리소스를 제공하는 서비스 메시 기반 계층입니다.",
    visibility: false,
  },
  {
    manifestPath: "istio/cni/",
    label: "istio-cni",
    namespace: "istio-system",
    description: "Ambient mesh 트래픽 리다이렉션을 담당하는 Istio CNI 구성입니다.",
    visibility: false,
  },
  {
    manifestPath: "istio/istiod/",
    label: "istiod",
    namespace: "istio-system",
    description: "서비스 메시 정책과 xDS 설정을 관리하는 Istio control plane입니다.",
    visibility: false,
  },
  {
    manifestPath: "istio/ztunnel/",
    label: "ztunnel",
    namespace: "istio-system",
    description: "Istio Ambient mesh의 노드 단위 L4 데이터 플레인입니다.",
    visibility: false,
  },
  {
    manifestPath: "mcp/",
    label: "k8s-mcp",
    namespace: "default",
    description: "Kubernetes API를 MCP 인터페이스로 다루기 위한 내부 서버입니다.",
    visibility: false,
  },
];

const SORTED_APPS = [...APP_META].sort((a, b) => {
  if (a.visibility !== b.visibility) {
    return a.visibility ? -1 : 1;
  }
  return a.label.localeCompare(b.label);
});

export function HomelabAppsPage() {
  return (
    <div className="grid gap-2 sm:grid-cols-12">
      <Card className="sm:col-span-12">
        <CardContent className="flex flex-wrap items-center gap-2">
          <CardTitle className="w-full">Cluster status</CardTitle>
          {BADGES_PREVIEW.map((badge) => (
            <img
              key={badge.label}
              src={badge.src}
              alt={`Cluster ${badge.label} badge`}
              loading="lazy"
              className="h-5 w-auto"
            />
          ))}
        </CardContent>
      </Card>

      {SORTED_APPS.map((app) => (
        <div key={app.label} className="sm:col-span-6">
          {app.serviceUrl ? (
            <a
              href={app.serviceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <HomelabAppCard app={app} />
            </a>
          ) : (
            <HomelabAppCard app={app} />
          )}
        </div>
      ))}
    </div>
  );
}

function HomelabAppCard({ app }: { app: HomelabAppMeta }) {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{app.label}</span>
          <span className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {app.visibility ? (
              <LockOpen className="mr-1 inline-block h-3 w-3 align-[-2px]" />
            ) : (
              <Lock className="mr-1 inline-block h-3 w-3 align-[-2px]" />
            )}
            {app.visibility ? "public" : "private"}
          </span>
        </CardTitle>
        <CardDescription>{app.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          namespace/{app.namespace}
        </p>
        {app.serviceUrl ? (
          <p className="mt-1 text-xs text-muted-foreground">
            {app.serviceUrl}
          </p>
        ) : null}
        <p className="mt-1 text-xs text-muted-foreground">
          {app.manifestPath}
        </p>
      </CardContent>
    </Card>
  );
}
