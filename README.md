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
- `/homelab-apps` : `/homelab` 리다이렉트

## 디렉터리 구조

```text
src/
  components/
    profile/
      cards/
  hooks/
  lib/
  pages/
```
