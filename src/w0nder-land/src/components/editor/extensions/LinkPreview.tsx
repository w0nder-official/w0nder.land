import { mergeAttributes, Node, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

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

  renderHTML({ HTMLAttributes }) {
    return ['link-preview', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(LinkPreviewView);
  },
});

const LinkPreviewView = ({
  node,
}: {
  node: { attrs: { title: string; url: string; target: string; image?: string } };
}) => (
  <NodeViewWrapper>
    <div className="mx-auto overflow-hidden bg-white rounded-lg border border-gray-200 flex flex-row">
      <a href={node.attrs.url} target={node.attrs.target} rel="noreferrer" className="flex-grow flex items-center ">
        <div className="px-5">
          <p className="link-title text-base font-bold text-gray-900">{node.attrs.title}</p>
          <p className="link text-m text-gray-400">{node.attrs.url}</p>
        </div>
      </a>

      {node.attrs.image && (
        <a
          href={node.attrs.url}
          target={node.attrs.target}
          rel="noreferrer"
          className="basis-1/3 flex-shrink-0 max-w-44">
          <img className="h-full w-full object-cover object-center" src={node.attrs.image} alt={node.attrs.title} />
        </a>
      )}
    </div>
  </NodeViewWrapper>
);
