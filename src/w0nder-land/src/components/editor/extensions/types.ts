import type { ReactNodeViewProps } from '@tiptap/react';

/**
 * 공통 HTML 속성 타입
 */
export type HTMLAttributes = Record<string, string | number | boolean | undefined>;

/**
 * NodeView Props의 타입 (Tiptap의 ReactNodeViewProps를 직접 사용)
 */
export type NodeViewProps = ReactNodeViewProps;

/**
 * TipTap Node 타입 상수
 */
export const NODE_TYPES = {
  AD_NODE: 'adNode',
} as const;
