import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from '@tiptap/extension-document';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from "@tiptap/extension-placeholder";
import { Extension } from '@tiptap/core';
import "./Tiptap.css";
import useEditorStore from "@/stores/editorStore";
import { EditorToolbar } from "@/tiptap/toolbar";
import { useEffect } from "react";

const CustomDocument = Document.extend({
  content: 'heading block*',
})

const RequiredHeading = Extension.create({
  name: 'requiredHeading',

  addKeyboardShortcuts() {
    return {
      'Enter': ({ editor }) => {
        // Get the current selection position
        const { from } = editor.state.selection;
        
        // Determine if the selection is inside a heading
        const isInHeading = editor.isActive('heading');
        
        // If in heading and it's empty, prevent the Enter key behavior
        if (isInHeading) {
          const headingNode = editor.getJSON().content?.find(node => 
            node.type === 'heading'
          );
          
          const headingText = headingNode?.content?.[0]?.text || '';
          
          if (!headingText.trim()) {
            // Add a visual indicator that the heading is required
            const headingElement = document.querySelector('h1');
            if (headingElement) {
              headingElement.classList.add('required-heading-empty');
              setTimeout(() => {
                headingElement.classList.remove('required-heading-empty');
              }, 500);
            }
            return true; // Prevent default Enter behavior
          }
        }
        
        return false; // Allow default Enter behavior
      }
    }
  },
})

interface TiptapProps {
    initialContent?: string;
    updateContent?: CallableFunction;
    placeholder?: string;
    titlePlaceholder?: string;
}

export default (props: TiptapProps) => {
    const {
        documentHTML,
        setDocumentTitle,
        setDocumentHTML,
        setDocumentPlainText
    } = useEditorStore();
    
    // Default initial content with a heading
    const initialContent = props.initialContent || documentHTML || `
      <h1></h1>
      <p></p>
    `;
    
    const editor = useEditor({
        extensions: [
            CustomDocument,
            StarterKit.configure({
                document: false,
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return props.titlePlaceholder || 'Untitled';
                    }
                    return props.placeholder || '';
                },
                // Make the placeholder more noticeable
                emptyEditorClass: 'is-editor-empty',
                emptyNodeClass: 'is-node-empty',
            }),
            RequiredHeading, // Add our custom extension
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                defaultAlignment: 'left',
            }),
            Image,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'cursor-pointer text-blue-500 underline',
                },
            }),
        ],
        autofocus: 'start',
        editorProps: {
            attributes: {
              class: "h-full focus:outline-none prose-compact dark:prose-invert-compact max-w-none"
            },
        },
        content: initialContent,
        onUpdate({ editor }) {
            const plainText = editor.getText();
            const html = editor.getHTML();
            
            // Extract title from the first heading
            const titleNode = editor.getJSON().content?.find(node => 
                node.type === 'heading'
            );
            
            const title = titleNode?.content?.[0]?.text || '';
            
            if (props.updateContent) {
                props.updateContent(plainText, title);
            } else {
                setDocumentHTML(html);
                setDocumentPlainText(plainText);
                if (title) {
                    setDocumentTitle(title);
                }
            }
        },
    });

    useEffect(() => {
        if (editor) {
            const validateHeading = () => {
                const headingNode = editor.getJSON().content?.find(node => 
                    node.type === 'heading'
                );
                
                const headingText = headingNode?.content?.[0]?.text || '';
                
                if (!headingText.trim()) {
                    editor.commands.focus('start');
                    
                    const headingElement = document.querySelector('h1');
                    if (headingElement) {
                        headingElement.classList.add('required-heading-empty');
                        setTimeout(() => {
                            headingElement.classList.remove('required-heading-empty');
                        }, 800);
                    }
                    
                    return false;
                }
                
                return true;
            };
            
            editor.validateHeading = validateHeading;
        }
    }, [editor]);

    if (!editor) {
        return null;
    }
    
    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="w-full">
        <div className="w-full overflow-x-scroll">
          <div className="flex flex-nowrap min-w-max py-1">
            <EditorToolbar editor={editor} />
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full px-2 py-4 overflow-y-auto">
          <EditorContent editor={editor} className="h-full" />
        </div>
      </div>
    </div>
    );
};
