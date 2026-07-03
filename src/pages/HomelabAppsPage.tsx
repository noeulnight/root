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
  aliases?: string[];
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
  {
    label: "badges",
    src: "https://badges.lth.so/badge/deployment/badges/badges",
  },
] as const;

const APP_META: HomelabAppMeta[] = [
  {
    manifestPath: "apps/root.yml",
    label: "root",
    namespace: "root",
    description: "포트폴리오와 홈랩 서비스를 연결하는 메인 웹사이트입니다.",
    serviceUrl: "https://lth.so",
    aliases: ["https://limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/architecture.yml",
    label: "architecture",
    namespace: "architecture",
    description: "홈랩 토폴로지와 운영 구성을 시각화하는 공개 아키텍처 페이지입니다.",
    serviceUrl: "https://arch.lth.so",
    aliases: ["https://arch.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/argocd.yml",
    label: "argocd",
    namespace: "argocd",
    description:
      "GitOps 기반 선언형 배포를 관리하는 Argo CD 컨트롤 플레인입니다.",
    serviceUrl: "https://argo.lth.so",
    aliases: ["https://argo.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/authentik.yml",
    label: "authentik",
    namespace: "authentik",
    description: "SSO와 인증/인가를 담당하는 IdP 서비스입니다.",
    serviceUrl: "https://auth.lth.so",
    aliases: ["https://auth.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/badges.yml",
    label: "badges",
    namespace: "badges",
    description: "서비스 상태와 버전 배지를 생성해 노출하는 앱입니다.",
    serviceUrl: "https://badges.lth.so",
    aliases: ["https://badges.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/bridge.yml",
    label: "bridge",
    namespace: "bridge",
    description: "Proton Mail Bridge 기반 메일 연동을 제공하는 공개 API 서비스입니다.",
    serviceUrl: "https://bridge.lth.so",
    aliases: ["https://bridge.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/couchdb.yml",
    label: "couchdb",
    namespace: "couchdb",
    description: "동기화형 문서 데이터를 저장하는 CouchDB 데이터베이스입니다.",
    serviceUrl: "https://couchdb.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/doclane.yml",
    label: "doclane",
    namespace: "doclane",
    description: "문서와 북마크형 콘텐츠를 정리하는 홈랩 애플리케이션입니다.",
    serviceUrl: "https://book.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/ghost.yml",
    label: "ghost",
    namespace: "ghost",
    description: "블로그 콘텐츠를 발행하고 운영하는 Ghost 기반 CMS입니다.",
    serviceUrl: "https://blog.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/grafana.yml",
    label: "grafana",
    namespace: "grafana",
    description: "메트릭과 로그를 시각화하는 대시보드 서비스입니다.",
    serviceUrl: "https://monitoring.lth.so",
    aliases: ["https://monitoring.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/kepco.yml",
    label: "kepco",
    namespace: "kepco",
    description: "전력 사용량 데이터를 수집하고 확인하는 홈랩 서비스입니다.",
    serviceUrl: "https://kepco.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/kiali.yml",
    label: "kiali",
    namespace: "kiali",
    description: "서비스 메시 트래픽 흐름을 시각화하는 Kiali입니다.",
    serviceUrl: "https://kiali.lth.so",
    aliases: ["https://kiali.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/korail.yml",
    label: "korail",
    namespace: "korail",
    description: "코레일 실시간 열차 위치와 운행 상태를 제공하는 서비스입니다.",
    serviceUrl: "https://train.lth.so",
    aliases: ["https://train.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/kube-visualizer.yml",
    label: "kube-visualizer",
    namespace: "kube-visualizer",
    description: "클러스터 리소스 배치와 상태를 시각화하는 도구입니다.",
    serviceUrl: "https://visualized.lth.so",
    aliases: ["https://visualized.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/memos.yml",
    label: "memos",
    namespace: "memos",
    description: "개인 메모와 짧은 기록을 관리하는 공개 메모 서비스입니다.",
    serviceUrl: "https://memo.lth.so",
    aliases: ["https://memo.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/n8n.yml",
    label: "n8n",
    namespace: "n8n",
    description: "워크플로 자동화와 서비스 연동을 위한 n8n입니다.",
    serviceUrl: "https://workflow.lth.so",
    aliases: ["https://workflow.limtaehyun.dev"],
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
    manifestPath: "apps/osmproxy.yml",
    label: "osmproxy",
    namespace: "osmproxy",
    description: "OpenStreetMap 타일을 캐싱하고 프록시하는 지도 타일 서비스입니다.",
    serviceUrl: "https://osm.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/pmail.yml",
    label: "pmail",
    namespace: "pmail",
    description: "브라우저에서 메일을 사용할 수 있는 공개 웹메일 서비스입니다.",
    serviceUrl: "https://mail.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/rustfs.yml",
    label: "rustfs",
    namespace: "rustfs",
    description: "S3 호환 오브젝트 스토리지를 제공하는 RustFS 서비스입니다.",
    serviceUrl: "https://rustfs.lth.so",
    aliases: ["https://s3.lth.so", "*.s3.lth.so"],
    visibility: true,
  },
  {
    manifestPath: "apps/sikdae.yml",
    label: "sikdae",
    namespace: "sikdae",
    description: "식단과 생활 데이터를 확인하는 홈랩 애플리케이션입니다.",
    serviceUrl: "https://sikdae.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/slash.yml",
    label: "slash",
    namespace: "slash",
    description: "단축 도메인 서비스를 제공하는 Slash 서비스입니다.",
    serviceUrl: "https://s.lth.so",
    aliases: ["s"],
    visibility: true,
  },
  {
    manifestPath: "apps/spotify.yml",
    label: "spotify",
    namespace: "spotify",
    description: "Spotify 연동 데이터를 제공하는 서비스입니다.",
    serviceUrl: "https://spotify.lth.so",
    aliases: ["https://spotify.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/technitium.yml",
    label: "technitium",
    namespace: "technitium",
    description: "내부 DNS 및 도메인 해석을 담당하는 DNS 서버입니다.",
    serviceUrl: "https://dns.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/termix.yml",
    label: "termix",
    namespace: "termix",
    description: "브라우저에서 터미널 기반 관리 작업을 수행하는 공개 도구입니다.",
    serviceUrl: "https://terminal.lth.so",
    aliases: ["https://terminal.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/toolbox.yml",
    label: "toolbox",
    namespace: "toolbox",
    description: "운영에 필요한 작은 웹 도구들을 모아 제공하는 서비스입니다.",
    serviceUrl: "https://toolbox.lth.so",
    aliases: ["https://tool.lth.so", "https://t.lth.so"],
    visibility: true,
  },
  {
    manifestPath: "apps/traccar.yml",
    label: "traccar",
    namespace: "traccar",
    description: "위치 추적과 이동 데이터를 관리하는 Traccar 서비스입니다.",
    serviceUrl: "https://traccar.lth.so",
    visibility: true,
  },
  {
    manifestPath: "apps/tunnel.yml",
    label: "tunnel",
    namespace: "tunnel",
    description: "SSH remote port forwarding 기반 터널 게이트웨이 서비스입니다.",
    serviceUrl: "https://tunnel.lth.so",
    aliases: ["*.tunnel.lth.so"],
    visibility: true,
  },
  {
    manifestPath: "apps/vnc.yml",
    label: "vnc",
    namespace: "vnc",
    description: "원격 데스크톱 접근을 제공하는 VNC 게이트웨이입니다.",
    serviceUrl: "https://mac.lth.so",
    aliases: ["https://mac.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/wakapi.yml",
    label: "wakapi",
    namespace: "wakapi",
    description: "코딩 활동 시간을 수집하고 시각화하는 Wakapi입니다.",
    serviceUrl: "https://wakatime.lth.so",
    aliases: ["https://wakatime.limtaehyun.dev"],
    visibility: true,
  },
  {
    manifestPath: "apps/cert-manager.yml",
    label: "cert-manager",
    namespace: "cert-manager",
    description: "TLS 인증서 발급과 갱신을 자동화하는 인증서 관리 계층입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/gateway.yml",
    label: "gateway",
    namespace: "kube-system",
    description: "Kubernetes Gateway API 리소스를 관리하는 게이트웨이 계층입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/istio-base.yml",
    label: "istio-base",
    namespace: "istio-system",
    description: "Istio CRD와 기본 리소스를 제공하는 서비스 메시 기반 계층입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/istio-cni.yml",
    label: "istio-cni",
    namespace: "istio-system",
    description: "Ambient mesh 트래픽 리다이렉션을 담당하는 Istio CNI 구성입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/istio-ingress.yml",
    label: "istio-ingress",
    namespace: "istio-ingress",
    description: "외부 HTTP 트래픽을 클러스터 내부 서비스로 전달하는 ingress gateway입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/istiod.yml",
    label: "istiod",
    namespace: "istio-system",
    description: "서비스 메시 정책과 xDS 설정을 관리하는 Istio control plane입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/k8s-mcp.yml",
    label: "k8s-mcp",
    namespace: "default",
    description: "Kubernetes API를 MCP 인터페이스로 다루기 위한 내부 서버입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/mariadb.yml",
    label: "mariadb",
    namespace: "mariadb",
    description: "관계형 데이터를 저장하는 MariaDB 데이터베이스입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/mongo.yml",
    label: "mongo",
    namespace: "mongo",
    description: "문서형 데이터를 저장하는 MongoDB 데이터베이스입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/mysql.yml",
    label: "mysql",
    namespace: "mysql",
    description: "관계형 데이터를 저장하는 MySQL 데이터베이스입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/pgvector.yml",
    label: "pgvector",
    namespace: "pgvector",
    description: "벡터 검색 워크로드를 위한 pgvector 확장 PostgreSQL입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/postgres.yml",
    label: "postgres",
    namespace: "postgres",
    description: "서비스별 영속 데이터를 저장하는 PostgreSQL 데이터베이스입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/prometheus.yml",
    label: "prometheus",
    namespace: "prometheus",
    description: "클러스터와 서비스 메트릭을 수집하는 관측 스택입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/redis.yml",
    label: "redis",
    namespace: "redis",
    description: "캐시와 큐성 워크로드에 사용하는 Redis 데이터 저장소입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/sealed-secrets.yml",
    label: "sealed-secrets",
    namespace: "kube-system",
    description: "Git에 암호화된 Secret을 저장하기 위한 Sealed Secrets 컨트롤러입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/tailscale.yml",
    label: "tailscale",
    namespace: "tailscale",
    description: "Tailnet 기반 사설 접근, subnet route, split DNS를 제공하는 네트워크 계층입니다.",
    visibility: false,
  },
  {
    manifestPath: "apps/ztunnel.yml",
    label: "ztunnel",
    namespace: "istio-system",
    description: "Istio Ambient mesh의 노드 단위 L4 데이터 플레인입니다.",
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
          <p className="mt-1 break-all text-xs text-muted-foreground">
            {app.serviceUrl}
          </p>
        ) : null}
        {app.aliases?.length ? (
          <p className="mt-1 break-all text-xs text-muted-foreground">
            aliases/{app.aliases.join(", ")}
          </p>
        ) : null}
        <p className="mt-1 text-xs text-muted-foreground">
          {app.manifestPath}
        </p>
      </CardContent>
    </Card>
  );
}
