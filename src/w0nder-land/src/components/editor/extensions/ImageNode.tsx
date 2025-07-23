import { Image } from '@tiptap/extension-image';
import NextImage from 'next/image';
import { NodeViewWrapper, ReactNodeViewRenderer, NodeViewProps } from '@tiptap/react';

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

type ImageAttrs = {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
};

export const CustomImageView = ({ node }: NodeViewProps) => {
  const attrs = node.attrs as ImageAttrs;

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
