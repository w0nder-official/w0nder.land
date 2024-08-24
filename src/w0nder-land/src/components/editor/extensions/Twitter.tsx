import { mergeAttributes, Node, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
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

const TwitterView = ({ node }: { node: { attrs: { tweetId: string } } }) => (
  <NodeViewWrapper className="react-component">
    <div>
      <TwitterTweetEmbed placeholder="Loading" tweetId={node.attrs.tweetId} />
    </div>
  </NodeViewWrapper>
);
