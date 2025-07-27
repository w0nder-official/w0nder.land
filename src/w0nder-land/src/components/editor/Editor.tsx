import { ImageNode } from '@/components/editor/extensions/ImageNode';
import { LinkPreview } from '@/components/editor/extensions/LinkPreview';
import { Twitter } from '@/components/editor/extensions/Twitter';
import { Video } from '@/components/editor/extensions/Video';
import Link from '@tiptap/extension-link';
import type { Editor as TipTapEditor } from '@tiptap/react';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

export type EditorProps = {
  content: JSONContent | string;
  editable: boolean;
  onChange?: (content: JSONContent) => void;
};

const MenuItem = ({
  icon,
  title,
  action,
  isActive,
}: {
  icon: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
}) => (
  <button
    type="button"
    aria-label={title}
    className={`p-1 rounded-sm hover:bg-gray-800 hover:text-gray-100  ${isActive && isActive() ? 'bg-gray-300' : ''}`}
    onClick={action}
    title={title}>
    <i className={`ri-${icon}`} />
  </button>
);

const MenuBar = ({ editor }: { editor: TipTapEditor }) => (
  <div className="flex flex-row justify-between">
    <MenuItem
      {...{
        icon: 'bold',
        title: 'Bold',
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive('bold'),
      }}
    />

    <MenuItem
      {...{
        icon: 'italic',
        title: 'Italic',
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive('italic'),
      }}
    />
    <MenuItem
      {...{
        icon: 'strikethrough',
        title: 'Strike',
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive('strike'),
      }}
    />
    <MenuItem
      {...{
        icon: 'code-view',
        title: 'Code',
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: () => editor.isActive('code'),
      }}
    />

    <div className="divider" />

    <MenuItem
      {...{
        icon: 'h-1',
        title: 'Heading 1',
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive('heading', { level: 1 }),
      }}
    />
    <MenuItem
      {...{
        icon: 'h-2',
        title: 'Heading 2',
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive('heading', { level: 2 }),
      }}
    />
    <MenuItem
      {...{
        icon: 'paragraph',
        title: 'Paragraph',
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: () => editor.isActive('paragraph'),
      }}
    />

    <MenuItem
      {...{
        icon: 'list-unordered',
        title: 'Bullet List',
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive('bulletList'),
      }}
    />

    <MenuItem
      {...{
        icon: 'list-ordered',
        title: 'Ordered List',
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive('orderedList'),
      }}
    />

    <MenuItem
      {...{
        icon: 'code-box-line',
        title: 'Code Block',
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => editor.isActive('codeBlock'),
      }}
    />

    <MenuItem
      {...{
        icon: 'image-add-line',
        title: 'Image',
        action: () => {
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        },
      }}
    />

    <MenuItem
      {...{
        icon: 'image-add-line',
        title: 'link',
        action: () => {
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }
        },
      }}
    />

    <div className="divider" />

    <MenuItem
      {...{
        icon: 'double-quotes-l',
        title: 'Blockquote',
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive('blockquote'),
      }}
    />

    <MenuItem
      {...{
        icon: 'separator',
        title: 'Horizontal Rule',
        action: () => editor.chain().focus().setHorizontalRule().run(),
      }}
    />

    <div className="divider" />

    <MenuItem
      {...{
        icon: 'text-wrap',
        title: 'Hard Break',
        action: () => editor.chain().focus().setHardBreak().run(),
      }}
    />

    <MenuItem
      {...{
        icon: 'format-clear',
        title: 'Clear Format',
        action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
      }}
    />

    <div className="divider" />

    <MenuItem
      {...{
        icon: 'arrow-go-back-line',
        title: 'Undo',
        action: () => editor.chain().focus().undo().run(),
      }}
    />
    <MenuItem
      {...{
        icon: 'arrow-go-forward-line',
        title: 'Redo',
        action: () => editor.chain().focus().redo().run(),
      }}
    />
  </div>
);

export const Editor = ({ content, editable, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      ImageNode,
      LinkPreview,
      Video,
      Twitter,
      Link.configure({
        HTMLAttributes: {
          class: 'underline text-emerald-600',
        },
      }),
      StarterKit.configure({
        history: { depth: 100 },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Markdown.configure({
        html: true,
        tightLists: true,
        tightListClass: 'tight',
        bulletListMarker: '-',
        linkify: false,
        breaks: false,
        transformPastedText: false,
        transformCopiedText: false,
      }),
    ],
    editable,
    onUpdate: ({ editor: updatedEditor }) => onChange?.(updatedEditor.getJSON()),
    content,
  });

  return (
    <div className="h-full flex-grow flex flex-col justify-between">
      {editable && editor && <MenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className="overflow-y-auto flex-grow prose prose-lg max-w-none
          prose-headings:text-black prose-headings:font-black
          prose-p:text-black prose-p:leading-relaxed prose-p:text-xl
          prose-strong:text-black prose-strong:font-black
          prose-em:text-black prose-em:italic
          prose-code:text-black prose-code:bg-gray-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-100 prose-pre:text-black
          prose-blockquote:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-4
          prose-ul:text-black prose-ol:text-black
          prose-li:text-black
          prose-a:text-emerald-600 prose-a:underline
          prose-img:rounded-lg prose-img:shadow-lg"
      />
    </div>
  );
};
