/**
 * Google AdSense 광고 슬롯 ID 관리
 *
 * Google AdSense 계정에서 광고 유닛을 생성한 후,
 * 각 슬롯 ID를 여기에 설정하세요.
 *
 * 광고 유닛 생성 방법:
 * 1. Google AdSense 계정에 로그인
 * 2. 광고 > 광고 단위 > 새 광고 단위 만들기
 * 3. 광고 형식 선택 (표시 광고, 인피드 광고 등)
 * 4. 생성된 광고 단위 ID를 아래 상수에 입력
 *
 * 하나의 광고 슬롯을 여러 위치에서 재사용합니다.
 */

/**
 * 광고 슬롯 타입
 * 배너: 모든 페이지 상단/하단에서 사용 (728x90 또는 반응형)
 * 인라인: 콘텐츠 중간에 사용 (300x250 또는 반응형)
 * 사각형: 특정 위치에 사용 (300x250)
 */
export enum AdSlotType {
  BANNER = 'BANNER',
  INLINE = 'INLINE',
  RECTANGLE = 'RECTANGLE',
}

/**
 * 광고 슬롯 ID 매핑
 * 환경 변수에서 값을 가져오거나 기본값 사용
 */
const adSlotValues: Record<AdSlotType, string> = {
  [AdSlotType.BANNER]: process.env.NEXT_PUBLIC_ADS_BANNER || 'YOUR_BANNER_AD_SLOT',
  [AdSlotType.INLINE]: process.env.NEXT_PUBLIC_ADS_INLINE || 'YOUR_INLINE_AD_SLOT',
  [AdSlotType.RECTANGLE]: process.env.NEXT_PUBLIC_ADS_RECTANGLE || 'YOUR_RECTANGLE_AD_SLOT',
};

/**
 * 광고 슬롯 ID 접근자
 * 타입 안전한 방식으로 광고 슬롯 ID를 가져옵니다.
 */
export const AD_SLOTS = {
  [AdSlotType.BANNER]: adSlotValues[AdSlotType.BANNER],
  [AdSlotType.INLINE]: adSlotValues[AdSlotType.INLINE],
  [AdSlotType.RECTANGLE]: adSlotValues[AdSlotType.RECTANGLE],
} as const;

/**
 * 광고 형식 타입
 */
export enum AdFormat {
  AUTO = 'auto',
  RECTANGLE = 'rectangle',
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}
