import { mergeAttributes, Node, NodeViewWrapper, ReactNodeViewRenderer, NodeViewProps } from '@tiptap/react';

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

type VideoAttrs = {
  title: string;
  url: string;
};

export const VideoView = ({ node }: NodeViewProps) => {
  const attrs = node.attrs as VideoAttrs;

  return (
    <NodeViewWrapper>
      <div className="w-full overflow-hidden bg-white rounded-lg border border-gray-200">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video controls loop autoPlay className="w-full">
          <source src={attrs.url} type="video/mp4" title={attrs.title} />
          Your browser does not support the video tag.
        </video>
      </div>
    </NodeViewWrapper>
  );
};
