---
title: 'Tailscale + Caddy + DNS Challenge로 VPN 환경에서 SSL 인증서 발급하기'
author: 'w0nder'
shortUrl: 'tailscale-caddy-dns-challenge'
authorProfile: '/images/profile_image.jpg'
category: 'TECH'
keywords:
  ['Tailscale', 'Caddy', 'DNS Challenge', 'SSL 인증서', 'Lets Encrypt', 'VPN', 'Docker', 'Cloudflare', '인프라', '보안']
createdAt: '2025-07-15T09:00:00Z'
updatedAt: '2025-07-15T10:30:00Z'
---

## 개요

VPN 환경에서 SSL 인증서 발급이 얼마나 까다로운지 직접 겪어봤다. Public IP가 없고 방화벽 뒤에 있는 서버에서는 일반적인 Let's Encrypt 인증서 발급이 불가능하다.

Tailscale을 사용하고 있는 환경에서 Redash에 접근하려고 할 때 이런 문제에 부딪혔다. 결국 Cloudflare DNS Challenge를 활용해서 해결했는데, 생각보다 간단했다. 이 과정을 정리해봤다.

## 사전 요구사항

- ✅ 리눅스 서버에 Tailscale 설치 완료 (IP: 100.199.199.199)
- ✅ 방화벽으로 인한 포트 제한 (Tailscale 통해서만 접근 가능)
- ✅ Redash 서비스 실행 중 (포트 5000)
- ✅ Cloudflare DNS에 Tailscale IP 등록 완료
- ✅ `redash.infra.com` 도메인 사용 예정 (예시)

## DNS Challenge 이해하기

### 왜 DNS Challenge가 필요한가?

처음에는 일반적인 Let's Encrypt 인증서 발급을 시도했다. 하지만 실패했다. Public IP가 없고 80/443 포트에 외부 접근이 불가능한 환경에서는 당연한 결과였다.

그때 DNS Challenge라는 방식을 알게 됐다. DNS 시스템을 통해 도메인 소유권을 확인하는 방식인데, 외부에서 직접 접근할 수 없는 환경에서도 SSL 인증서를 발급받을 수 있다.

### HTTP Challenge vs DNS Challenge

**HTTP Challenge**

- **필요 조건**: Public IP + 80/443 포트
- **동작 방식**: Let's Encrypt가 서버에 직접 접근
- **VPN 환경**: ❌ 불가능
- **방화벽 뒤**: ❌ 불가능
- **자동화**: 부분적

**DNS Challenge**

- **필요 조건**: DNS API 접근 권한
- **동작 방식**: DNS 레코드를 통한 소유권 확인
- **VPN 환경**: ✅ 가능
- **방화벽 뒤**: ✅ 가능
- **자동화**: ✅ 완전 자동화

### DNS Challenge 동작 원리

DNS Challenge는 다음과 같은 단계로 진행된다:

```
1. 인증서 요청
   Caddy → Let's Encrypt: "redash.infra.com 인증서 발급 요청"

2. DNS Challenge 요청
   Let's Encrypt → Caddy: "TXT 레코드 생성 요청"
   TXT: _acme-challenge.redash.infra.com = "abc123..."

3. DNS 레코드 생성
   Caddy → Cloudflare API: "TXT 레코드 생성"
   Cloudflare → DNS: 레코드 생성 완료

4. 소유권 확인
   Let's Encrypt → DNS: "TXT 레코드 확인"
   DNS → Let's Encrypt: "확인 성공"

5. 인증서 발급
   Let's Encrypt → Caddy: "인증서 발급 완료"

6. 정리 작업
   Caddy → Cloudflare API: "임시 TXT 레코드 삭제"
```

이 과정에서 임시로 생성된 TXT 레코드는 인증서 발급 후 자동으로 삭제되어 DNS를 깔끔하게 유지한다.

## 설정 단계

### 1단계: Tailscale 상태 확인

```bash
# Tailscale 연결 상태 확인
tailscale status

# Tailscale IP 주소 확인
tailscale ip -4
```

### 2단계: Cloudflare DNS 설정

#### 2.1 DNS A 레코드 추가

Cloudflare 대시보드에서 다음 레코드를 추가한다:

- **Type**: A
- **Name**: redash
- **Content**: 100.199.199.199 (Tailscale IP)
- **Proxy**: DNS only (회색 구름)
- **TTL**: Auto

#### 2.2 API 토큰 생성

Cloudflare API 토큰이 필요하다. Caddy가 DNS 레코드를 자동으로 관리할 수 있게 해주는 역할을 한다.

1. **Cloudflare 대시보드** → **My Profile** → **API Tokens**
2. **"Create Token"** 클릭
3. **"Custom token"** 선택
4. **권한 설정**:
   - Zone:Zone:Edit
   - Zone:DNS:Edit
5. **Zone Resources**: `infra.com` 도메인 선택
6. **토큰 생성** 후 안전하게 보관

API 토큰은 민감한 정보니까 환경 변수로 관리하고, 절대 코드에 직접 포함하지 마라.

### 3단계: Docker 설정

#### 3.2 Caddyfile 생성

Caddy 설정 파일을 만든다. DNS Challenge와 리버스 프록시를 설정하는 부분이다.

```caddyfile
# caddy/Caddyfile

# HTTP를 HTTPS로 자동 리디렉션
:80 {
    redir https://{host}{uri} permanent
}

# 메인 도메인 설정
redash.infra.com {
    # DNS Challenge를 통한 SSL 인증서 발급
    tls {
        dns cloudflare {env.CLOUDFLARE_API_TOKEN}
    }

    # Redash 서비스로 프록시
    reverse_proxy 100.199.199.199:5000
}
```

이 설정으로 HTTP 요청은 자동으로 HTTPS로 리디렉션되고, DNS Challenge를 통해 SSL 인증서가 자동으로 발급된다.

#### 3.3 Dockerfile 생성

Cloudflare DNS 플러그인이 포함된 Caddy 이미지를 빌드한다.

```dockerfile
# caddy/Dockerfile

# Cloudflare DNS 플러그인이 포함된 Caddy 빌드
FROM caddy:2-builder AS builder
RUN xcaddy build --with github.com/caddy-dns/cloudflare

# 최종 이미지 생성
FROM caddy:2-alpine
COPY --from=builder /usr/bin/caddy /usr/bin/caddy
```

공식 Caddy 이미지에 Cloudflare DNS 플러그인을 추가해서 DNS Challenge 기능을 사용할 수 있게 만든다.

#### 3.4 docker-compose.yml 생성

Docker Compose로 Caddy 서비스를 관리한다.

```yaml
# docker-compose.yml
services:
  caddy:
    build:
      context: ./caddy
      dockerfile: Dockerfile
    container_name: caddy-redash
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
    env_file:
      - .env
    volumes:
      - caddy_data:/data
      - caddy_config:/config

volumes:
  caddy_data:
  caddy_config:
```

#### 3.5 환경 변수 설정

Cloudflare API 토큰을 환경 변수로 설정한다.

```bash
# .env 파일 생성
cat > .env << EOF
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token_here
EOF

# 보안을 위한 파일 권한 설정
chmod 600 .env
```

실제 API 토큰으로 `your_cloudflare_api_token_here` 부분을 교체하면 된다.

### 4단계: 서비스 실행

모든 설정이 끝나면 서비스를 시작한다.

```bash
# Docker Compose로 서비스 시작
docker-compose up -d
```

서비스가 정상적으로 시작되면 Caddy가 자동으로 SSL 인증서를 발급받기 시작한다. 처음 실행할 때는 DNS 전파 시간 때문에 몇 분 정도 걸릴 수 있다.

## 검증 및 테스트

### 1. 브라우저 접근 테스트

브라우저로 실제 접근을 테스트한다.

1. 브라우저에서 `https://redash.infra.com` 접속
2. SSL 인증서가 정상적으로 표시되는지 확인
3. Redash 로그인 페이지가 정상적으로 로드되는지 확인

브라우저 주소창에 자물쇠 아이콘이 표시되고 "안전함" 메시지가 나타나면 성공이다.

### 2. 자동 갱신

Let's Encrypt 인증서는 90일마다 자동으로 갱신된다.

Caddy는 인증서 만료 30일 전부터 자동으로 갱신을 시도하니까, 별도의 관리 없이도 인증서가 항상 유효한 상태를 유지한다.
