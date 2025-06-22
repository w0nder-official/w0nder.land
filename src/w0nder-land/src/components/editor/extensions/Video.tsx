import { mergeAttributes, Node, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

export const Video = Node.create({
  name: 'video',
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
        tag: 'video',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoView);
  },
});

const VideoView = ({ node }: { node: { attrs: { title: string; url: string } } }) => (
  <NodeViewWrapper>
    <div className="w-full overflow-hidden bg-white rounded-lg  border-2 border-yellow-400">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video controls loop autoPlay className="w-full">
        <source src={node.attrs.url} type="video/mp4" title={node.attrs.title} />
        Your browser does not support the video tag.
      </video>
    </div>
  </NodeViewWrapper>
);
