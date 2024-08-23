import { JSONContent } from '@tiptap/react';
import * as marked from 'marked';
import { load } from 'cheerio';

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
