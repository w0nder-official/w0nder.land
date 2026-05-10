---
title: '같은 IP인데 왜 막히나: TLS 핸드셰이크와 봇 탐지'
author: 'w0nder'
shortUrl: 'tls-handshake-bot-detection'
authorProfile: '/images/profile_image.jpg'
category: 'TECH'
keywords:
  [
    'Cloudflare',
    '봇 탐지',
    'TLS',
    'ClientHello',
    'JA3',
    'TLS fingerprint',
    'HTTP/2',
    'User-Agent',
    'WAF',
    'curl-impersonate',
    'curl_cffi',
  ]
createdAt: '2026-05-10T09:00:00Z'
updatedAt: '2026-05-10T09:00:00Z'
---

개인 프로젝트에서 쓰던 API가 어느 날부터 이상하게 동작했다.
맥북에서는 JSON이 잘 오는데, 같은 코드를 리눅스 서버에 올리면 결과가 달랐다. 그렇다고 딱 떨어지게 “실패”라고 하기도 어려웠다. HTTP 에러는 없었고
상태 코드는 200, 연결도 정상이었다. 그런데 응답 본문이 JSON이 아니라 HTML이었다.

열어보니 익숙한 문구가 떴다.

> Just a moment…

Cloudflare 봇 차단 페이지였다.

이상한 건 따로 있었다. 두 환경이 같은 NAT 뒤에 있었고, 밖에서 보면 같은 공인 IP를 썼다. 토큰도 같고 요청 헤더도 같고 User-Agent도 맞춰놨다. 그런
데 맥북은 통과하고 서버만 막혔다.

## TLS 핸드셰이크가 먼저다

요즘 WAF나 Bot Management는 HTTP보다 아래를 먼저 본다. 핵심은 TLS 핸드셰이크, 그중에서도 초반에 보내는 ClientHello다. 사실상 “이 요청을 누가 보
냈는지”를 보여주는 신분증 같은 역할을 한다.

많이 헷갈리는 지점이 여기다.
보통은 HTTP 요청이 시작이라고 생각하지만 실제 순서는 이렇다.

1. TCP 연결
2. TLS 핸드셰이크
3. HTTP 요청

우리가 자주 바꾸는 User-Agent는 맨 마지막에 나온다.
그러니까 “UA를 Chrome으로 바꿨는데 왜 막히지?”가 안 먹히는 경우가 많은 거다. 차단 로직은 그 전에 이미 판단을 시작한다.

## ClientHello 안에는 생각보다 많은 정보가 있다

ClientHello에는 cipher suite 목록, extension, supported groups, signature algorithms, ALPN, SNI 같은 값이 들어간다. 중요한 건 값 자체뿐 아니라
순서다. 이 조합이 TLS 라이브러리마다 꽤 일정한 패턴을 만든다.

- Chrome: BoringSSL
- Firefox: NSS
- Python requests: 보통 OpenSSL
- Go: crypto/tls
- Java/.NET: 각자 자체 구현

그래서 같은 HTTPS 요청이어도 핸드셰이크 모양은 클라이언트마다 다르게 나온다.

이걸 분류하는 대표 방식이 JA3다. ClientHello 주요 필드를 묶어 해시를 만들면, HTTP를 보기 전에도 “브라우저 계열인지 자동화 클라이언트인지”를 어느
정도 가를 수 있다.

## UA랑 TLS가 안 맞으면 더 수상해 보인다

HTTP 헤더는 최신 Chrome처럼 보이는데 TLS fingerprint는 OpenSSL 기반 Python 클라이언트처럼 보이는 경우가 있다. 사람 눈에는 “UA만 바꿨구나”지만,
엣지 입장에서는 오히려 강한 의심 신호다. 정상 브라우저라면 HTTP와 TLS가 같이 움직여야 하니까.

## HTTP/2에서도 흔적이 남는다

TLS를 통과해도 끝이 아니다. HTTP/2 연결이 열리면 SETTINGS 프레임을 보내는데, 여기 값들(헤더 테이블 크기, 초기 윈도우 크기, 동시 스트림 수 등)도
브라우저마다 다르다. pseudo-header 순서나 WINDOW_UPDATE 패턴까지 fingerprint에 쓰인다.

결국 지금 웹에서 “클라이언트”는 헤더 몇 줄이 아니다.
TLS 스택, HTTP/2 구현, 프레임 순서, flow control까지 묶인 네트워크 스택 전체가 정체성이다.

엣지가 보는 건 “어떤 IP냐”보다 “어떤 스택이 이 연결을 만들었냐”에 가깝다.

## 그래서 임퍼소네이션 도구도 접근이 다르다

요즘 browser impersonation 도구들은 헤더만 바꾸지 않는다.
curl-impersonate는 TLS/HTTP2 동작을 브라우저에 가깝게 맞추고, curl_cffi도 비슷한 접근을 쓴다.

결국 브라우저를 흉내 낸다는 건 문자열 몇 개 바꾸는 작업이 아니라, 네트워크 스택 동작 자체를 맞추는 일이다.

## 다시 원래 문제로 돌아가면

예전엔 User-Agent만 바꿔도 꽤 통했다. 지금은 아니다.
현대 웹의 봇 탐지는 HTTP 헤더보다 TLS, HTTP/2 레이어에서 먼저 시작된다. 그리고 그 레이어는 생각보다 솔직하다. 코드에서 겉모습을 아무리 브라우저
처럼 꾸며도, 핸드셰이크는 구현체의 정체를 거의 그대로 드러낸다.

내가 겪은 “맥북은 되는데 서버는 안 되는” 현상도 같은 맥락이었다.
같은 IP를 써도 엣지가 본 건 IP가 아니었다. 맥북 쪽은 브라우저 fingerprint, 서버 쪽은 자동화 클라이언트 fingerprint로 보였던 거다.

겉으로는 같은 요청인데, 네트워크 레벨에서는 처음부터 다른 클라이언트였다.
