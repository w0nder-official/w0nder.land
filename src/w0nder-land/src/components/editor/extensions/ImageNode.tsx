import { Image } from '@tiptap/extension-image';
import NextImage from 'next/image';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type { NodeViewProps } from './types';

type ImageNodeAttrs = {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
};

export const ImageNode = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomImageView);
  },
});

export const CustomImageView = (props: NodeViewProps) => {
  const { node } = props;
  const attrs = node.attrs as ImageNodeAttrs;

  if (!attrs.src || !attrs.alt) {
    return null;
  }

  return (
    <NodeViewWrapper>
      <NextImage
        className="rounded max-w-full h-auto my-0 mx-auto mt-8 border"
        src={attrs.src}
        alt={attrs.alt}
        width={attrs.width ?? 600}
        height={attrs.height ?? 600}
      />
    </NodeViewWrapper>
  );
};
