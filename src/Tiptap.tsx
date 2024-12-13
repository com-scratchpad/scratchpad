import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Tiptap.css";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Strikethrough } from "lucide-react";

export default () => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: `
      <p>
        Write some text here...
      </p>
    `,
	});

	return (
		<>
			{editor && (
				<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
					<div className="flex flex-row items-center justify-center text-xs shadow-lg border h-8 rounded-md p-0.5 space-x-0.5">
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
			<EditorContent editor={editor} className="mx-24 my-24 h-full text-xs" />
		</>
	);
};
