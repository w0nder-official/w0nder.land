---
title: 'react-native-app-auth - Data intent is null 이슈 해결'
author: 'w0nder'
shortUrl: 'react-native-app-auth-data-intent-null'
authorProfile: '/images/profile_image.jpg'
keywords:
  [
    'React Native',
    'OAuth',
    'react-native-app-auth',
    'Android',
    'iOS',
    '인증',
    '딥링킹',
    'Intent',
    'Data intent is null',
    'OAuth 인증',
  ]
createdAt: '2025-07-16T09:00:00Z'
updatedAt: '2025-07-16T10:30:00Z'
---

## 문제 상황

[Show Your Time](https://showyourti.me) 앱에서 찍은 인증 사진을 [Checkable](https://checkable.app)에 바로 업로드할 수 있는 기능을 구현하기 위해 OAuth 인증 시스템이 필요했다. React Native에서 OAuth를 구현하기 위해 [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth) 라이브러리를 선택했다.

<link-preview url="https://showyourti.me" title="Show Your Time" target="_blank" image="https://www.showyourti.me/images/og.png">
</link-preview>

<link-preview url="https://checkable.app" title="Checkable" target="_blank" image="https://www.checkable.app/images/og.png">
</link-preview>

## 초기 구현

기본 설정은 간단해 보였다:

```typescript
const config: AuthConfiguration = {
  clientId: Configure.CheckableClientId,
  redirectUrl: 'showyourtime://oauthredirect',
  usePKCE: true,
  scopes: ['all'],
  serviceConfiguration: {
    authorizationEndpoint: `${CHECKABLE_DOMAIN}/auth/member/oauth2/authorize`,
    tokenEndpoint: `${CHECKABLE_DOMAIN}/api/auth/member/oauth2/token`,
  },
};
```

iOS에서는 모든 것이 완벽하게 작동했다. 브라우저가 열리고, 로그인 후 앱으로 돌아와서 토큰을 성공적으로 받아왔다.

## Android에서 발생한 문제

Android에서 테스트하자마자 `[Error: Data intent is null]` 오류가 발생했다. 이는 OAuth 인증 후 앱으로 돌아올 때 Android에서 Intent 데이터를 제대로 받지 못해서 발생하는 문제였다.

## 문제 원인 분석

GitHub 이슈와 공식 문서를 확인한 결과, 동일한 스키마에 대해 여러 개의 intent-filter가 정의되어 있을 때 발생하는 문제임을 알았다.

Show Your Time 앱에서는 이미 딥링킹을 위해 `showyourtime://` 스키마를 사용하고 있었다. AndroidManifest.xml에는 다음과 같은 intent-filter가 정의되어 있었다:

```xml
<!-- 기존 딥링킹용 -->
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="showyourtime" />
</intent-filter>
```

그런데 react-native-app-auth 라이브러리를 사용하면서 OAuth 인증에서도 같은 `showyourtime://` 스키마를 사용하려고 하니, 라이브러리가 자동으로 다음과 같은 intent-filter를 추가로 생성했다:

```xml
<!-- OAuth용 (자동 생성) -->
<activity
    android:name="net.openid.appauth.RedirectUriReceiverActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="showyourtime" />
    </intent-filter>
</activity>
```

이렇게 되면 `showyourtime://` 스키마로 들어오는 Intent에 대해 Android 시스템이 어느 Activity로 보낼지 명확하게 판단할 수 없게 된다. Android에서는 이런 상황에서 Intent 라우팅이 불안정해지며, 특히 OAuth 인증 후 앱으로 돌아올 때 Intent 데이터가 제대로 전달되지 않아 `Data intent is null` 오류가 발생한다.

더 구체적으로 살펴보면, OAuth 인증 과정에서 브라우저가 `showyourtime://oauthredirect?code=xxx&state=xxx` 형태의 URL을 호출할 때, Android 시스템은 이를 처리할 수 있는 두 개의 Activity를 발견한다. 하나는 기존의 딥링킹용 MainActivity이고, 다른 하나는 OAuth 전용 RedirectUriReceiverActivity이다. 시스템이 잘못된 Activity로 Intent를 보내면 OAuth 라이브러리가 예상하는 데이터를 받지 못해 인증 과정이 실패하게 된다.

공식 문서에서도 이 문제에 대한 중요한 주의사항을 명시하고 있다:

> **ANDROID: When integrating with a project that utilizes deep linking, update the redirectUrl in your config and the appAuthRedirectScheme value in build.gradle to use a custom scheme so that it differs from the scheme used in your deep linking intent-filter.**

## 해결책: 스키마 분리

OAuth 인증용 스키마를 딥링킹용 스키마와 완전히 분리하는 것이 해결책이었다.

**스키마 변경:**

```
기존: showyourtime://oauthredirect
변경: showyourtime.auth://oauthredirect
```

**build.gradle 설정:**

```gradle
android {
    defaultConfig {
        manifestPlaceholders = [
            appAuthRedirectScheme: "showyourtime.auth"
        ]
    }
}
```

**AndroidManifest.xml 설정:**

```xml
<activity
    android:name="net.openid.appauth.RedirectUriReceiverActivity"
    android:exported="true"
    tools:node="replace">
    <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data android:scheme="showyourtime.auth"/>
    </intent-filter>
</activity>
```

**React Native 코드 수정:**

```typescript
const config: AuthConfiguration = {
  clientId: Configure.CheckableClientId,
  redirectUrl: 'showyourtime.auth://oauthredirect',
  // ... 나머지 설정은 동일
};
```

## 결과

모든 설정을 수정한 후 iOS와 Android 모두에서 OAuth 인증이 정상 작동했다. 브라우저에서 체커블 로그인 후 앱으로 자동 복귀되고, 토큰을 성공적으로 받아와서 API 호출이 가능해졌다.

## 교훈

공식 문서를 꼼꼼히 읽는 것이 중요하다. 특히 플랫폼별 주의사항은 반드시 확인해야 한다. iOS에서만 테스트하지 말고 Android도 함께 테스트해야 하며, 새로운 라이브러리를 도입할 때는 문서를 더욱 꼼꼼히 읽고 모든 플랫폼에서 테스트하는 습관을 가져야 한다.

## 참고문헌

- [authorize() returns error 'Data intent is null' on Android · Issue #494 · FormidableLabs/react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth/issues/494#issuecomment-728962072)
- [Data intent is null in Android using Universal Links/AppLinks using React Native - Stack Overflow](https://stackoverflow.com/questions/75873663/data-intent-is-null-in-android-using-universal-links-applinks-using-react-native)
- [GitHub - FormidableLabs/react-native-app-auth: React native bridge for AppAuth - an SDK for communicating with OAuth2 providers](https://github.com/FormidableLabs/react-native-app-auth?tab=readme-ov-file#notes)
