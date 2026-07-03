# lth.so profile web

포트폴리오/홈랩 소개용 웹입니다.
`Home`, `Projects`, `Homelab` 탭으로 구성되며, Spotify/Wakapi 데이터를 프록시 API로 조회해 카드에 표시합니다.

## CI/CD

`main` 브랜치 푸시 시 GitHub Actions가 Docker 이미지를 GHCR로 빌드/푸시합니다.

- workflow: `.github/workflows/docker.yml`
- image: `ghcr.io/<owner>/<repo>`
- tags: `latest`, `sha`
- platform: `linux/arm64`

## 라우트

- `/` : Home
- `/projects` : Projects
- `/homelab` : Homelab

## 개발

프론트엔드와 Go 백엔드를 각각 실행합니다.

```bash
pnpm install
pnpm dev:backend
pnpm dev
```

Vite 개발 서버는 `/api` 요청을 기본값 `http://localhost:8080`으로 프록시합니다.
다른 백엔드 주소를 쓰려면 `VITE_BACKEND_TARGET`을 설정합니다.

```bash
VITE_BACKEND_TARGET=http://localhost:9090 pnpm dev
```

백엔드 환경 변수:

- `PORT`: Go 서버 포트, 기본값 `8080`
- `STATIC_DIR`: 정적 프론트 빌드 디렉터리, 기본값 `dist`
- `WAKAPI_TARGET`: Wakapi 업스트림, 기본값 `https://wakatime.lth.so`
- `WAKAPI_API_KEY`: Wakapi API key
- `SPOTIFY_TARGET`: Spotify 업스트림, 기본값 `https://spotify.lth.so`
- `GHOST_TARGET`: Ghost 업스트림, 기본값 `https://blog.lth.so`
- `GHOST_CONTENT_API_KEY`: Ghost Content API key
- `TRACCAR_TARGET`: Traccar 업스트림, 기본값 `https://traccar.lth.so`
- `TRACCAR_TOKEN`: Traccar bearer token
- `TRACCAR_DEVICE_ID`: Traccar device id, 기본값 `1`

## 백엔드 API

- `GET /api/health`
- `GET /api/wakapi/all-time`
- `GET /api/spotify/top/songs`
- `GET /api/ghost`
- `GET /api/traccar/location`

## 디렉터리 구조

```text
backend/
  cmd/
  internal/
src/
  components/
    profile/
      cards/
  hooks/
  lib/
  pages/
```
