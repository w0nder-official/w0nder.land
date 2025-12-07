import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import type { NodeViewProps, HTMLAttributes } from './types';

type TwitterAttrs = {
  tweetId: string | null;
};

export const Twitter = Node.create({
  name: 'twitter',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      tweetId: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('tweetId') || '',
        renderHTML: (attributes: { tweetId: string | number | null }) => ({
          tweetId: attributes.tweetId?.toString() || '',
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'twitter',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: HTMLAttributes }) {
    return ['twitter', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TwitterView);
  },
});

const TwitterView = (props: NodeViewProps) => {
  const { node } = props;
  const attrs = node.attrs as TwitterAttrs;

  if (!attrs.tweetId) {
    return null;
  }

  return (
    <NodeViewWrapper className="react-component">
      <div>
        <TwitterTweetEmbed placeholder="Loading" tweetId={attrs.tweetId} />
      </div>
    </NodeViewWrapper>
  );
};
