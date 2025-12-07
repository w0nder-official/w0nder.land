import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type { NodeViewProps, HTMLAttributes } from './types';

type LinkPreviewAttrs = {
  title: string | null;
  url: string | null;
  target: string;
  image: string | null;
};

export const LinkPreview = Node.create({
  name: 'linkPreview',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      url: {
        default: null,
      },
      title: {
        default: null,
      },
      target: {
        default: '_blank',
      },
      image: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'link-preview',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: HTMLAttributes }) {
    return ['link-preview', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(LinkPreviewView);
  },
});

export const LinkPreviewView = (props: NodeViewProps) => {
  const { node } = props;
  const attrs = node.attrs as LinkPreviewAttrs;

  if (!attrs.url || !attrs.title) {
    return null;
  }

  return (
    <NodeViewWrapper>
      <div className="mx-auto overflow-hidden bg-white rounded-lg border border-gray-200 flex flex-row">
        <a href={attrs.url} target={attrs.target} rel="noreferrer" className="grow flex items-center ">
          <div className="px-5">
            <p className="link-title text-base font-bold text-gray-900">{attrs.title}</p>
            <p className="link text-m text-gray-400">{attrs.url}</p>
          </div>
        </a>

        {attrs.image && (
          <a href={attrs.url} target={attrs.target} rel="noreferrer" className="basis-1/3 shrink-0 max-w-44">
            <img
              className="h-full w-full object-cover object-center"
              src={attrs.image}
              alt={attrs.title || undefined}
            />
          </a>
        )}
      </div>
    </NodeViewWrapper>
  );
};
