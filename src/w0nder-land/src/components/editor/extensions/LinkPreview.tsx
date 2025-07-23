import { mergeAttributes, Node, NodeViewWrapper, ReactNodeViewRenderer, NodeViewProps } from '@tiptap/react';

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

type LinkPreviewAttrs = {
  title: string;
  url: string;
  target: string;
  image?: string;
};

export const LinkPreviewView = ({ node }: NodeViewProps) => {
  const attrs = node.attrs as LinkPreviewAttrs;

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
            <img className="h-full w-full object-cover object-center" src={attrs.image} alt={attrs.title} />
          </a>
        )}
      </div>
    </NodeViewWrapper>
  );
};
