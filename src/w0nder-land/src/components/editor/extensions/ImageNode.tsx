import { Image } from '@tiptap/extension-image';
import NextImage from 'next/image';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

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

export const CustomImageView = ({
  node,
}: {
  node: { attrs: { src: string; alt: string; width?: number; height?: number } };
}) => (
  <NodeViewWrapper>
    <NextImage
      className="rounded max-w-full h-auto my-0 mx-auto mt-8 border-2 border-yellow-400"
      src={node.attrs.src}
      alt={node.attrs.alt}
      width={node.attrs.width ?? 600}
      height={node.attrs.height ?? 600}
    />
  </NodeViewWrapper>
);
