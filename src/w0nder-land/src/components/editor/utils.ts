import type { JSONContent } from '@tiptap/core';
import * as marked from 'marked';
import { load } from 'cheerio';
import { AdSlotType, AdFormat } from '@/constants/ads';
import { NODE_TYPES } from '@/components/editor/extensions/types';

/**
 * 콘텐츠를 중간 지점에서 분할하는 함수
 * 마크다운 문자열의 경우 단락 경계를 찾아 자연스럽게 분할
 * JSONContent의 경우 배열의 중간 지점에서 분할
 */
export function splitContentAtMiddle(
  content: JSONContent | string,
): [JSONContent | string, JSONContent | string] | null {
  if (typeof content === 'string') {
    // 마크다운 문자열인 경우
    const lines = content.split('\n');
    const middleIndex = Math.floor(lines.length / 2);

    // 단락 경계를 찾기 (빈 줄이나 헤딩 근처)
    let splitIndex = middleIndex;
    for (let i = middleIndex; i < lines.length && i < middleIndex + 10; i += 1) {
      if (lines[i].trim() === '' || lines[i].startsWith('#')) {
        splitIndex = i + 1;
        break;
      }
    }

    const firstPart = lines.slice(0, splitIndex).join('\n');
    const secondPart = lines.slice(splitIndex).join('\n');

    return [firstPart, secondPart];
  }

  // JSONContent인 경우
  if (typeof content === 'object' && content !== null) {
    if (Array.isArray(content)) {
      const middleIndex = Math.floor(content.length / 2);
      return [content.slice(0, middleIndex), content.slice(middleIndex)];
    }

    if (content.content && Array.isArray(content.content)) {
      const middleIndex = Math.floor(content.content.length / 2);
      const firstContent = { ...content, content: content.content.slice(0, middleIndex) };
      const secondContent = { ...content, content: content.content.slice(middleIndex) };
      return [firstContent, secondContent];
    }
  }

  return null;
}

/**
 * 광고 노드 타입 정의
 */
export type AdNodeConfig = {
  adSlot: AdSlotType;
  adFormat?: AdFormat;
};

/**
 * 콘텐츠 중간에 광고 노드를 삽입하는 함수
 * @param content 원본 콘텐츠
 * @param adConfig 광고 설정 (선택적, 기본값: IN_ARTICLE)
 * @returns 광고 노드가 삽입된 콘텐츠 또는 null
 */
export function insertAdInContent(
  content: JSONContent | string,
  adConfig: AdNodeConfig = { adSlot: AdSlotType.IN_ARTICLE, adFormat: AdFormat.IN_ARTICLE },
): JSONContent | string | null {
  if (typeof content === 'string') {
    // 마크다운 문자열인 경우 - 분할 후 중간에 광고 마크다운 삽입
    const split = splitContentAtMiddle(content);
    if (!split) {
      return null;
    }

    // 광고 마크다운 노드 삽입 (TipTap이 파싱할 수 있는 형태)
    const adMarkdown = `\n\n<div data-type="ad" data-ad-slot="${adConfig.adSlot}" data-ad-format="${adConfig.adFormat || AdFormat.IN_ARTICLE}"></div>\n\n`;
    return `${split[0]}${adMarkdown}${split[1]}`;
  }

  // JSONContent인 경우
  if (typeof content === 'object' && content !== null) {
    if (Array.isArray(content)) {
      const middleIndex = Math.floor(content.length / 2);
      const adNode: JSONContent = {
        type: NODE_TYPES.AD_NODE,
        attrs: {
          adSlot: adConfig.adSlot,
          adFormat: adConfig.adFormat || AdFormat.IN_ARTICLE,
        },
      };
      return [...content.slice(0, middleIndex), adNode, ...content.slice(middleIndex)];
    }

    if (content.content && Array.isArray(content.content)) {
      const middleIndex = Math.floor(content.content.length / 2);
      const adNode: JSONContent = {
        type: NODE_TYPES.AD_NODE,
        attrs: {
          adSlot: adConfig.adSlot,
          adFormat: adConfig.adFormat || AdFormat.IN_ARTICLE,
        },
      };
      return {
        ...content,
        content: [...content.content.slice(0, middleIndex), adNode, ...content.content.slice(middleIndex)],
      };
    }
  }

  return null;
}

export const getTexts = (content?: JSONContent | JSONContent[] | string) => {
  if (!content) {
    return '';
  }

  if (typeof content === 'string') {
    const html = String(marked.parse(content, { async: false }));
    const $ = load(html);
    $('link-preview').remove();
    return $('body').text();
  }

  const texts: string[] = [];

  if (Array.isArray(content)) {
    // 배열인 경우, 각 요소에 대해 함수를 재귀적으로 호출
    content.forEach(item => {
      texts.push(getTexts(item));
    });
  } else {
    // 단일 객체인 경우
    if (content.text) {
      // 'text' 속성이 있는 경우 추가
      texts.push(content.text);
    }

    if (content.content) {
      // 'content' 배열이 있는 경우, 각 요소에 대해 함수를 재귀적으로 호출
      texts.push(getTexts(content.content));
    }
  }

  return texts.join('\n');
};
