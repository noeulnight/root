import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Lock, LockOpen } from "lucide-react";

type HomelabAppMeta = {
  file: string;
  label: string;
  description: string;
  serviceUrl: string;
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
    file: "architecture.yml",
    label: "architecture",
    description: "홈랩 아키텍쳐를 볼 수 있는 페이지입니다.",
    serviceUrl: "https://arch.lth.so",
    visibility: true,
  },
  {
    file: "argocd.yml",
    label: "argocd",
    description:
      "GitOps 기반 선언형 배포를 관리하는 Argo CD 컨트롤 플레인입니다.",
    serviceUrl: "https://argo.lth.so",
    visibility: false,
  },
  {
    file: "authentik.yml",
    label: "authentik",
    description: "SSO와 인증/인가를 담당하는 IdP 서비스입니다.",
    serviceUrl: "https://auth.lth.so",
    visibility: false,
  },
  {
    file: "badges.yml",
    label: "badges",
    description: "서비스 상태와 버전 배지를 생성해 노출하는 앱입니다.",
    serviceUrl: "https://badges.lth.so",
    visibility: true,
  },
  {
    file: "bridge.yml",
    label: "bridge",
    description: "메일 브리지 기능을 HTTP API로 제공하는 서비스입니다.",
    serviceUrl: "https://bridge.lth.so",
    visibility: false,
  },
  {
    file: "coder.yml",
    label: "coder",
    description: "브라우저 기반 원격 개발 환경을 제공하는 서비스입니다.",
    serviceUrl: "https://coder.lth.so",
    visibility: false,
  },
  {
    file: "ghost.yml",
    label: "ghost",
    description: "블로그/콘텐츠 발행을 위한 Ghost CMS 서비스입니다.",
    serviceUrl: "https://blog.lth.so",
    visibility: true,
  },
  {
    file: "grafana.yml",
    label: "grafana",
    description: "메트릭과 로그를 시각화하는 대시보드 서비스입니다.",
    serviceUrl: "https://monitoring.lth.so",
    visibility: true,
  },
  {
    file: "kiali.yml",
    label: "kiali",
    description: "서비스 메시 트래픽 흐름을 시각화하는 Kiali입니다.",
    serviceUrl: "https://kiali.lth.so",
    visibility: true,
  },
  {
    file: "kube-visualizer.yml",
    label: "kube-visualizer",
    description: "클러스터 리소스 배치와 상태를 시각화하는 도구입니다.",
    serviceUrl: "https://visualized.lth.so",
    visibility: true,
  },
  {
    file: "n8n.yml",
    label: "n8n",
    description: "워크플로 자동화와 서비스 연동을 위한 n8n입니다.",
    serviceUrl: "https://workflow.lth.so",
    visibility: false,
  },
  {
    file: "roundcube.yml",
    label: "roundcube",
    description: "브라우저에서 메일을 사용할 수 있는 Roundcube 웹메일입니다.",
    serviceUrl: "https://mail.lth.so",
    visibility: false,
  },
  {
    file: "slash.yml",
    label: "slash",
    description: "단축 도메인 서비스를 제공하는 Slash 서비스입니다.",
    serviceUrl: "https://s.lth.so",
    visibility: false,
  },
  {
    file: "spotify.yml",
    label: "spotify",
    description: "Spotify 연동 데이터를 제공하는 서비스입니다.",
    serviceUrl: "https://spotify.lth.so",
    visibility: true,
  },
  {
    file: "technitium.yml",
    label: "technitium",
    description: "내부 DNS 및 도메인 해석을 담당하는 DNS 서버입니다.",
    serviceUrl: "https://dns.lth.so",
    visibility: false,
  },
  {
    file: "wakapi.yml",
    label: "wakapi",
    description: "코딩 활동 시간을 수집하고 시각화하는 Wakapi입니다.",
    serviceUrl: "https://wakatime.lth.so",
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
        <a
          key={app.file}
          href={app.serviceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-6"
        >
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
              <p className="text-xs text-muted-foreground">{app.serviceUrl}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                apps/{app.file}
              </p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
