import { mergeAttributes, Node, NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

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
        parseHTML: element => element.getAttribute('tweetId') || '',
        renderHTML: attributes => ({
          tweetId: attributes.tweetId.toString(),
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

  renderHTML({ HTMLAttributes }) {
    return ['twitter', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TwitterView);
  },
});

type TwitterAttrs = {
  tweetId: string;
};

const TwitterView = ({ node }: NodeViewProps) => {
  const attrs = node.attrs as TwitterAttrs;

  return (
    <NodeViewWrapper className="react-component">
      <div>
        <TwitterTweetEmbed placeholder="Loading" tweetId={attrs.tweetId} />
      </div>
    </NodeViewWrapper>
  );
};
