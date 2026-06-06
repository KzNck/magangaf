'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import React, { useCallback } from 'react';

type Props = {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
};

// ============================================================================
// TOOLBAR BUTTON
// ============================================================================
function ToolbarButton({
  onClick,
  isActive = false,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="tiptap-toolbar-btn"
      style={{
        background: isActive ? 'var(--af-navy)' : 'transparent',
        color: isActive ? 'white' : 'var(--af-gray-500)',
        border: '1px solid',
        borderColor: isActive ? 'var(--af-navy)' : 'var(--af-gray-200)',
        borderRadius: '8px',
        padding: '6px 10px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: 1,
        transition: 'all 0.15s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '32px',
        height: '32px',
      }}
      onMouseOver={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'var(--af-offwhite)';
          e.currentTarget.style.borderColor = 'var(--af-gray-300)';
        }
      }}
      onMouseOut={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'var(--af-gray-200)';
        }
      }}
    >
      {children}
    </button>
  );
}

// ============================================================================
// TOOLBAR
// ============================================================================
function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const addImage = useCallback(() => {
    const url = window.prompt('URL gambar:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL link:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px 12px',
        borderBottom: '1px solid var(--af-gray-100)',
        background: 'var(--af-offwhite)',
        borderRadius: '12px 12px 0 0',
      }}
    >
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <strong>B</strong>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <em>I</em>
      </ToolbarButton>

      <div style={{ width: '1px', background: 'var(--af-gray-200)', margin: '0 4px' }} />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        H2
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        H3
      </ToolbarButton>

      <div style={{ width: '1px', background: 'var(--af-gray-200)', margin: '0 4px' }} />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        •≡
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Ordered List"
      >
        1.
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Blockquote"
      >
        &ldquo;
      </ToolbarButton>

      <div style={{ width: '1px', background: 'var(--af-gray-200)', margin: '0 4px' }} />

      <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Link">
        🔗
      </ToolbarButton>

      <ToolbarButton onClick={addImage} title="Gambar">
        🖼
      </ToolbarButton>

      <div style={{ width: '1px', background: 'var(--af-gray-200)', margin: '0 4px' }} />

      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        ―
      </ToolbarButton>
    </div>
  );
}

// ============================================================================
// TIPTAP EDITOR COMPONENT
// ============================================================================
export default function TipTapEditor({ value = '', onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
          style: 'color: var(--af-crimson); text-decoration: underline; cursor: pointer;',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'tiptap-image',
          style: 'max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0;',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        style: `
          min-height: 200px;
          padding: 16px;
          outline: none;
          font-size: 14px;
          line-height: 1.7;
          color: var(--af-text);
          font-family: 'Inter', sans-serif;
        `,
        'data-placeholder': placeholder || 'Tulis konten di sini...',
      },
    },
  });

  return (
    <div
      style={{
        border: '1px solid var(--af-gray-100)',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'white',
        transition: 'border-color 0.2s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'var(--af-navy)';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,27,62,0.06)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--af-gray-100)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <style>{`
        .tiptap-editor-content h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--af-navy);
          margin: 16px 0 8px;
          font-family: 'Playfair Display', serif;
        }
        .tiptap-editor-content h3 {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--af-navy);
          margin: 12px 0 6px;
          font-family: 'Playfair Display', serif;
        }
        .tiptap-editor-content p {
          margin: 0 0 8px;
        }
        .tiptap-editor-content ul,
        .tiptap-editor-content ol {
          padding-left: 24px;
          margin: 8px 0;
        }
        .tiptap-editor-content blockquote {
          border-left: 3px solid var(--af-crimson);
          padding-left: 16px;
          margin: 12px 0;
          color: var(--af-text-muted);
          font-style: italic;
        }
        .tiptap-editor-content hr {
          border: none;
          border-top: 2px solid var(--af-gray-100);
          margin: 16px 0;
        }
        .tiptap-editor-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--af-gray-300);
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
