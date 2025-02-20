import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Tiptap.css";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Strikethrough } from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
interface CreateDocumentResponse {
    document_id: string;
}

interface TiptapProps {
  initialContent?: string;
  placeholder?: string;
}

export default ({ initialContent = '', placeholder = 'Write something...' }: TiptapProps) => {
  const documentId = undefined;
  const accessToken = undefined;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    autofocus: true,
    editorProps: {
      attributes: {
        class: "flex-1 h-full overscroll-auto",
      },
    },
    content: initialContent || '', // Ensure content is properly initialized
    onUpdate({ editor }) {
      const content = editor.getText();
      invoke("save", { content, documentId, accessToken });
    },
  });

  // Update content when initialContent prop changes
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

	const handleContainerClick = () => {
		if (editor && !editor.isFocused) {
			editor.commands.focus("end");
		}
	};

	return (
		<div
			className="h-full w-full overflow-scroll"
			onClick={handleContainerClick}
		>
			{editor && (
				<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
					<div
						className="flex flex-row items-center justify-center text-xs shadow-lg border h-8 rounded-md p-0.5 space-x-0.5"
						onClick={(e) => e.stopPropagation()}
					>
						<Toggle
							size={"xs"}
							aria-label="Toggle bold"
							pressed={editor.isActive("bold")}
							onClick={() => editor.chain().focus().toggleBold().run()}
						>
							<Bold className="max-w-3" />
						</Toggle>
						<Toggle
							size={"xs"}
							aria-label="Toggle Italic"
							pressed={editor.isActive("italic")}
							onClick={() => editor.chain().focus().toggleItalic().run()}
						>
							<Italic className="max-w-3" />
						</Toggle>
						<Toggle
							size={"xs"}
							aria-label="Toggle Strikethrough"
							pressed={editor.isActive("strike")}
							onClick={() => editor.chain().focus().toggleStrike().run()}
						>
							<Strikethrough className="max-w-3" />
						</Toggle>
					</div>
				</BubbleMenu>
			)}
			<EditorContent editor={editor} className="mx-24 mt-24 text-xs" />
		</div>
	);
};