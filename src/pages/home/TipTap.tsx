import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export function TipTap(props: Props) {
  const editor = useEditor({
    extensions,
    content: props.value,

    onTransaction({ editor }) {
      props.onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (!editor) {
      return;
    }

    if (!props.value) {
      return;
    }

    if (Object.is(props.value, editor.getHTML())) {
      return;
    }

    const animationId = requestAnimationFrame(() => {
      editor.commands.setContent(props.value, false);
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  });

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>
        <button
          onClick={() => {
            editor?.commands.setContent("<p>reset</p>");
          }}
        >
          This is the floating menu
        </button>
      </FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  );
}

const extensions = [StarterKit];

type Props = {
  value: string;
  onChange(string: string): void;
};
