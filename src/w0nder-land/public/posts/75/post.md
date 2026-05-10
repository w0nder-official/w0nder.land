---
title: '맥북은 통과, 서버는 차단: TLS Fingerprinting과 현대 봇 탐지의 실제 구조'
author: 'w0nder'
shortUrl: 'tls-fingerprinting-modern-bot-detection'
authorProfile: '/images/profile_image.jpg'
category: 'TECH'
keywords:
  [
    'Cloudflare',
    '봇 탐지',
    'TLS',
    'ClientHello',
    'JA3',
    'JA4',
    'GREASE',
    'ALPN',
    'TLS fingerprint',
    'HTTP/2',
    'HTTP/2 fingerprint',
    'Passive Fingerprinting',
    'User-Agent',
    'WAF',
    'Bot Management',
    'curl-impersonate',
    'curl_cffi',
    'BoringSSL',
    'OpenSSL',
  ]
createdAt: '2026-05-10T09:00:00Z'
updatedAt: '2026-05-10T18:00:00Z'
---

개인 프로젝트에서 쓰던 API가 어느 날부터 이상하게 동작했다. 맥북에서는 JSON이 잘 오는데, 같은 코드를 리눅스 서버에 올리면 결과가 달랐다. 그렇다고 딱 떨어지게 "실패"라고 하기도 어려웠다. HTTP 에러는 없었고 상태 코드는 200이었으며 연결도 정상이었다. 그런데 응답 본문이 JSON이 아니라 HTML이었다.

열어보니 익숙한 문구가 떴다.

> Just a moment…

Cloudflare 봇 차단 페이지였다. 그 순간 문제의 성격이 바뀌었다. 애플리케이션 로직이나 인증이 아니라, 요청이 오리진에 닿기 전에 엣지에서 걸러지고 있다는 뜻이었다.

더 이상한 건 두 환경이 같은 NAT 뒤에 있었다는 점이다. 밖에서 보면 같은 공인 IP를 썼다. 토큰도 같고 요청 헤더도 같고 User-Agent도 맞춰 놨다. 그런데 맥북은 통과하고 서버만 막혔다.

요즘 WAF와 Bot Management는 HTTP 헤더만 보지 않는다. UA, Accept, Accept-Language는 코드 한 줄로 바꿀 수 있으니까다. 대신 더 깊은 레이어를 본다. 그중 첫 번째가 **TLS 핸드셰이크의 첫 패킷, ClientHello**다. 사실상 "이 연결을 누가 만들었는지"를 보여 주는 신분증에 가깝다.

많은 사람은 HTTP 요청이 통신의 시작이라고 생각하지만 실제 순서는 다르다.

1. TCP 연결
2. TLS ClientHello (및 이어지는 핸드셰이크)
3. TLS 완료 후, ALPN에 따라 HTTP/2 등 상위 프로토콜
4. HTTP/2라면 초기 SETTINGS 등 프레임
5. 비로소 HTTP 요청(여기에 User-Agent 포함)

우리가 자주 바꾸는 User-Agent는 맨 마지막에 나온다. 그래서 **"UA를 Chrome으로 바꿨는데 왜 막히지?"**가 잘 안 먹히는 경우가 많다. 의심 신호를 보기 시작하는 시점에는 아직 UA가 도착하지 않았을 수 있다.

## ClientHello 안에는 생각보다 많은 정보가 있다

ClientHello에는 cipher suite 목록과 그 순서, TLS extension 목록과 순서, supported groups(타원곡선), signature algorithms, ALPN, SNI, GREASE로 삽입되는 값 등이 들어간다. 중요한 건 값만이 아니라 **순서와 조합**이다. 이 패턴은 TLS 라이브러리마다 꽤 안정적으로 다르다.

| 클라이언트 예시   | TLS 스택               |
| ----------------- | ---------------------- |
| Chrome            | BoringSSL              |
| Firefox           | NSS                    |
| Python `requests` | 대개 OpenSSL           |
| Go `net/http`     | crypto/tls             |
| Java / .NET       | 각각 JSSE 등 자체 구현 |

같은 HTTPS 요청이라도 핸드셰이크 모양은 클라이언트마다 다르게 나온다. 라이브러리는 자기 정체를 꽤 정직하게 드러낸다.

### JA3: TLS 지문의 대표 포맷

이 차이를 묶어 지문으로 쓰는 대표적인 방식이 **JA3**(Salesforce에서 널리 알려진 TLS fingerprinting)다. ClientHello에서 뽑은 필드를 정해진 순서로 이어 붙여 **MD5 해시**를 만든다. 다루는 대표 필드는 다음과 같은 묶음으로 정리된다.

- SSL/TLS 버전에 해당하는 필드
- Cipher 목록
- Extension 목록
- Elliptic curve
- Elliptic curve point format

복호화 없이 패킷 헤더만으로(passive하게) 분류할 수 있다는 점에서 자주 인용된다.

한편 JA3는 extension 순서 변화에 민감하고, 아래에서 설명할 GREASE 때문에 같은 브라우저라도 지문이 잘게 갈라지는 문제도 알려져 있다.

### GREASE와 JA4

Chrome·BoringSSL 계열은 **GREASE**(Generate Random Extensions And Sustain Extensibility)라는 메커니즘을 쓴다. 중간 장비가 특정 extension만 가정하고 깨지지 않도록, `0x0A0A`, `0x1A1A` 같은 **예약된 랜덤처럼 보이는 값**을 extension으로 끼워 넣는다. 이 패턴 자체가 브라우저 쪽 특징이 되기도 한다.

**JA4**(FoxIO)는 이런 JA3의 한계를 완화하려는 차세대 포맷으로 알려져 있다. GREASE를 정규화해 무시하고, 일부 필드를 정렬·정규화해 **브라우저 마이너 업데이트에 덜 흔들리도록** 설계됐다는 점이 핵심 개선으로 자주 언급된다. 표현 형태도 MD5 한 줄보다 읽기 쉬운 구조(예: TLS 버전·SNI 유무·cipher 개수·ALPN의 HTTP/2 여부 등을 압축한 식별자)로 정리하는 방향이다.

### ALPN도 지문의 일부다

**ALPN**(Application-Layer Protocol Negotiation)은 TLS 안에서 상위 프로토콜을 무엇으로 할지 미리 맞추는 협상이다. `h2`, `http/1.1`, 환경에 따라 `h3` 등이 오간다. 클라이언트마다 **제시하는 프로토콜 목록의 구성과 순서**가 다르기 때문에, 이 역시 TLS fingerprint의 한 요소로 쓰인다.

## HTTP/2에서도 정체가 드러난다

TLS만 통과하면 끝이 아니다. 연결이 HTTP/2로 올라가면 클라이언트는 보통 초기 **SETTINGS** 프레임을 보낸다. `SETTINGS_HEADER_TABLE_SIZE`, `SETTINGS_INITIAL_WINDOW_SIZE`, `SETTINGS_MAX_CONCURRENT_STREAMS` 같은 값들은 **브라우저·런타임별 기본값이 다르다**. 여기에 SETTINGS가 나가는 순서, 초기 `WINDOW_UPDATE` 패턴, `PRIORITY` 프레임 사용 여부, 그리고 요청 시 **pseudo-header**(`:method`, `:path`, `:scheme`, `:authority`)의 전송 순서까지 합치면, TLS와는 별도의 또 하나의 지문이 된다.

이 영역은 연구·업계에서 HTTP/2 클라이언트의 passive fingerprinting으로 다뤄 왔고, Black Hat EU 2017의 _Passive Fingerprinting of HTTP/2 Clients_ 같은 자료가 자주 인용된다. TLS만 흉내 내고 HTTP/2 스택이 어색하면 여전히 걸리는 이유가 여기에 있다.

## Passive fingerprinting과 다층 신호

**Passive fingerprinting**은 트래픽을 변조하지 않고 관찰만 해서 클라이언트를 구분하는 방식이다. TCP·TLS·HTTP/2·헤더 순서·타이밍·세션 행동 등이 관측 대상이 될 수 있다.

현대 Bot Management는 보통 **단일 패킷 지문만**으로 끝내지 않는다. TLS(JA3/JA4 등)·HTTP/2 지표·요청 간격·세션 연속성·과거 평판 같은 신호를 **점수화**해 결합하는 구조로 이해하는 편이 안전하다. 공개 문서나 필드 용어로는 시간 구간별 브라우저 비율·프로토콜 혼합 비율 같은 지표가 언급되기도 하는데, 중요한 건 **"같은 IP"가 곧 같은 신원이 아니라는 점**이다. 같은 공인 IP에서도 ClientHello·HTTP/2 스택이 다른 두 프로세스는 다른 클라이언트로 집계될 수 있다.

## UA랑 TLS가 안 맞으면 더 수상해 보인다

HTTP 헤더는 최신 Chrome처럼 보이는데 TLS 지문은 OpenSSL 기반 Python 클라이언트처럼 보이는 경우가 있다. 사람 눈에는 "UA만 바꿨구나"지만, 엣지 입장에서는 **UA와 TLS 구현이 따로 노는 강한 의심 신호**가 될 수 있다. 정상 브라우저라면 문자열과 TLS·HTTP/2 스택이 함께 움직이는 편이니까.

## 그래서 임퍼소네이션 도구도 접근이 다르다

요즘 browser impersonation 도구들은 헤더만 바꾸지 않는다. **curl-impersonate**는 단순 패치 수준이 아니라, TLS 스택을 브라우저에 가깝게 맞추기 위해 **OpenSSL 대신 BoringSSL 계열을 쓰는 방향**으로 가져가며 ClientHello의 cipher·extension 순서·GREASE 패턴까지 동기화한다. HTTP/2 SETTINGS와 pseudo-header 순서·flow control 쪽 동작도 브라우저에 맞추는 쪽이 핵심이다.

Python에서는 **curl_cffi**가 비슷한 접근을 감싼 형태로 자주 쓰인다.

```python
from curl_cffi import requests

requests.get(url, impersonate="chrome124")
```

겉으로는 Python 코드지만, 실제로는 libcurl 기반 경로를 통해 **특정 Chrome 버전 프로파일에 가까운 TLS·HTTP/2 fingerprint**를 만들려는 목적에 가깝다.

## HTTP/3·QUIC까지

최신 환경에서는 HTTP/3(QUIC)에서도 transport parameter, QUIC 위의 TLS, 패킷 타이밍·혼잡 제어 패턴 등이 별도의 관측 대상이 된다는 이야기가 나온다. JA4 계열이 TLS·HTTP·지연·지역성 등으로 확장되는 흐름도 문서에서 함께 다뤄진다.

## 다시 원래 문제로 돌아가면

예전엔 User-Agent만 바꿔도 꽤 통했다. 지금은 아니다. 현대 웹의 봇 탐지는 HTTP 헤더보다 **TLS ClientHello와 HTTP/2 초기 동작**부터 시작되는 경우가 많다. 그리고 그 레이어는 생각보다 솔직하다. 코드에서 겉모습을 아무리 브라우저처럼 꾸며도, 핸드셰이크는 구현체의 정체를 거의 그대로 드러낸다.

내가 겪은 "맥북은 되는데 서버는 안 되는" 현상도 같은 맥락이었다. 같은 IP를 써도 엣지가 본 건 IP가 아니었다. 맥북 쪽은 Chrome·BoringSSL에 가까운 스택으로 보였고, 서버 쪽은 OpenSSL 기반 자동화 클라이언트에 가깝게 보였을 뿐이다. 겉으로는 같은 요청인데, 네트워크 레벨에서는 처음부터 다른 클라이언트였다.
