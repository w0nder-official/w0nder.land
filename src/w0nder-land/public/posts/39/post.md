---
title: '모바일 환경에서의 OAuth 2.0 보안 구현'
author: 'w0nder'
shortUrl: 'oauth-mobile-security'
authorProfile: '/images/profile_image.jpg'
category: 'TECH'
keywords:
  [
    'OAuth',
    'OAuth2.0',
    '모바일보안',
    'PKCE',
    '모바일앱',
    '인증',
    '보안',
    'CSRF',
    '토큰관리',
    '리디렉션',
    '모바일개발',
    '보안구현',
    'AuthorizationCode',
    'AccessToken',
    'RefreshToken',
    '모바일OAuth',
  ]
createdAt: '2025-08-28T09:00:00Z'
updatedAt: '2025-08-28T10:30:00Z'
---

# 모바일 환경에서의 OAuth 2.0 보안 구현 가이드

모바일 애플리케이션에서 OAuth 2.0을 구현할 때는 웹 환경과는 근본적으로 다른 보안 접근 방식을 취해야 합니다. 모바일 앱은 OAuth 2.0 및 OAuth 2.1 초안에서 정의하는 **Public Client**에 해당하며, 이는 단순한 분류가 아니라 보안 설계의 근본적 차이를 의미합니다.

## 모바일 OAuth의 기본 원리와 웹과의 차이점

웹 애플리케이션은 서버 환경에서 실행되어 클라이언트 시크릿과 같은 민감한 정보를 안전하게 보관할 수 있습니다. 반면 모바일 앱은 사용자 디바이스에서 실행되므로 본질적으로 비밀 정보를 완전히 보호할 수 없는 환경에 놓여 있습니다.

모바일 앱이 클라이언트 시크릿을 안전하게 보관할 수 없는 이유는 명확합니다. 첫째, APK나 IPA 파일은 리버스 엔지니어링 도구를 사용해 쉽게 분석할 수 있습니다. 둘째, 모든 앱 인스턴스가 동일한 바이너리를 사용하므로 각 클라이언트별로 고유한 비밀 정보를 배포하는 것이 불가능합니다. 셋째, 런타임에서 메모리 덤프를 통해 하드코딩된 값을 추출할 수 있는 위험이 항상 존재합니다.

이러한 현실을 반영하여 OAuth 2.1 초안에서는 Public Client에서 클라이언트 시크릿을 아예 사용하지 않도록 권장하고 있습니다. 이는 "어떻게든 비밀을 숨겨보자"는 접근에서 "숨길 수 없다면 의존하지 말자"는 현실적 접근으로의 패러다임 전환을 나타냅니다.

## PKCE를 통한 핵심 보안 메커니즘 구현

모바일 환경에는 웹에서는 볼 수 없는 특별한 위협이 존재합니다. 바로 **Authorization Code Interception Attack**입니다. 이 공격은 공격자가 정당한 앱과 동일한 URL 스키마를 등록한 악성 앱을 배포하고, 사용자가 OAuth 인증을 완료한 후 Authorization Code를 악성 앱으로 가로채는 방식으로 이루어집니다.

PKCE(Proof Key for Code Exchange, RFC 7636)는 바로 이러한 문제를 해결하기 위해 설계된 메커니즘입니다. PKCE는 클라이언트 시크릿 없이도 Authorization Code를 안전하게 토큰으로 교환할 수 있는 방법을 제공합니다.

PKCE의 작동 원리는 일회용 증명(Proof-of-Possession) 개념에 기반합니다. 인증 요청 단계에서 클라이언트는 랜덤한 `code_verifier`를 생성하고 이를 SHA256으로 해시하여 `code_challenge`를 만들어 서버에 전송합니다. 토큰 요청 단계에서는 Authorization Code와 함께 원본 `code_verifier`를 서버에 보냅니다. 서버는 받은 `code_verifier`를 해시하여 이전에 받은 `code_challenge`와 일치하는지 확인합니다.

이 메커니즘의 핵심은 증명 정보가 분리되어 전송된다는 점입니다. 악성 앱이 Authorization Code를 가로채더라도, 정당한 앱만이 보유한 `code_verifier` 없이는 토큰을 발급받을 수 없습니다.

PKCE를 구현할 때는 몇 가지 필수 보안 요구사항을 준수해야 합니다. 반드시 S256 방식을 사용해야 하며, 평문(plain) 방식은 네트워크 도청에 취약하므로 피해야 합니다. `code_verifier`는 RFC 7636에서 권장하는 대로 최소 256비트(43자 이상)의 충분한 엔트로피를 가져야 하며, 매 인증 요청마다 새로운 값을 생성하여 재사용 공격을 방지해야 합니다.

## 안전한 Redirect URI 설정과 앱 식별

전통적인 Custom Scheme 방식(예: `myapp://oauth/callback`)은 스키마 충돌이라는 근본적 문제를 내포하고 있습니다. 운영체제는 동일한 스키마를 등록한 여러 앱 중 어느 것을 선택할지 보장할 수 없으며, 공격자가 인기 있는 앱의 스키마를 그대로 복사하여 사용할 수 있습니다. 또한 사용자가 여러 앱이 같은 스키마를 사용할 경우 올바른 앱을 선택하기 어려워집니다.

이러한 문제를 해결하기 위해 **Android App Links**와 **iOS Universal Links**를 사용하는 것이 권장됩니다. 이들은 HTTPS 기반 리디렉션을 사용하며 도메인 소유권 검증이라는 핵심 보안 메커니즘을 제공합니다.

도메인 검증 기반 보안은 공격자가 임의로 등록할 수 없는 도메인을 기반으로 하며, 플랫폼이 앱과 도메인 간의 관계를 검증하여 신뢰성을 보장합니다. 또한 앱이 설치된 경우 바로 앱으로 전환되고, 앱이 설치되지 않은 경우 웹페이지로 자연스럽게 연결되어 우아한 사용자 경험을 제공합니다.

RFC 8252에서는 가능한 한 HTTPS 기반 리디렉션을 권장하고 있으며, Custom Scheme이 불가피한 경우에는 reverse domain name 형태(예: `com.example.app://callback`)를 사용할 것을 제안합니다.

## 안전한 토큰 관리와 저장

OAuth 토큰은 사용자 계정에 접근할 수 있는 디지털 열쇠와 같은 중요한 자산입니다. 물리적 열쇠를 함부로 두지 않듯이, 토큰 역시 안전한 곳에 보관해야 합니다.

SharedPreferences, NSUserDefaults, localStorage와 같은 일반 저장소는 여러 위험에 노출됩니다. 취약한 권한 설정이 있을 경우 다른 앱이 데이터를 읽을 수 있고, 클라우드 백업 과정에서 평문 데이터가 유출될 위험이 있으며, 런타임에서 메모리 분석을 통해 토큰이 추출될 수 있습니다.

대신 플랫폼에서 제공하는 보안 저장소를 활용해야 합니다. iOS의 경우 Keychain Services를 사용할 수 있는데, 이는 Secure Enclave를 활용한 하드웨어 기반 암호화를 제공하고, Touch ID나 Face ID와 결합한 접근 제어가 가능하며, 앱 삭제 후에도 선택적으로 토큰을 보존할 수 있습니다.

Android에서는 Keystore나 EncryptedSharedPreferences를 사용할 수 있습니다. Android Keystore는 TEE(Trusted Execution Environment)를 활용한 하드웨어 보안 모듈을 제공하며, 별도 구현 없이도 데이터를 자동으로 암호화해주고, 루팅 탐지와 연동된 추가 보안 레이어를 제공합니다.

토큰의 생명주기 관리도 중요합니다. Access Token의 수명은 탈취 시 피해를 최소화하기 위해 가능한 한 짧게 유지해야 합니다. 일반 서비스에서는 15분에서 1시간, 고민감 서비스에서는 5분에서 15분, 금융 서비스에서는 3분에서 10분 정도로 설정하는 것이 적절합니다.

Refresh Token의 경우 자동 순환 메커니즘을 구현해야 합니다. 토큰 갱신 시마다 새로운 토큰을 발급하고 이전 토큰을 즉시 무효화하는 방식으로, 공격자가 토큰을 탈취하더라도 다음 갱신 시 무효화되도록 합니다. 이는 RFC 6749 및 OAuth 2.1 초안에서 권장하는 보안 사항입니다.

## State 매개변수를 통한 CSRF 공격 방어

Cross-Site Request Forgery 공격은 사용자가 의도하지 않은 요청을 실행하도록 유도하는 공격 방식입니다. OAuth 플로우에서는 공격자가 자신의 계정으로 인증된 Authorization Code를 피해자의 세션에 주입할 수 있는 위험이 있습니다.

이를 방어하기 위해 State 매개변수를 적절히 구현해야 합니다. 암호학적으로 안전한 랜덤 값을 생성하여 세션에 저장하고, 인증 요청 시 전송한 state 값과 콜백에서 받은 state 값의 일치 여부를 반드시 확인해야 합니다. 또한 State 값을 현재 사용자 세션과 연결하여 세션 고정 공격을 방지하는 것이 중요합니다.

<link-preview url="https://datatracker.ietf.org/doc/html/rfc6749" title="RFC 6749" target="_blank">
</link-preview>

<link-preview url="https://datatracker.ietf.org/doc/html/rfc7636" title="RFC 7636" target="_blank">
</link-preview>

<link-preview url="https://datatracker.ietf.org/doc/html/rfc8252" title="RFC 8252" target="_blank">
</link-preview>

<link-preview url="https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/" title="OAuth 2.1 Draft" target="_blank">
</link-preview>
