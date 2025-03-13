import { useEffect, useState } from "react";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Heading1, 
  Heading2, 
  Heading3,
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  List, 
  ListOrdered, 
  Indent, 
  Outdent,
  Link,
  Image,
  Code,
  Quote
} from "lucide-react";

interface EditorToolbarProps {
  editor: any; // You can use a more specific type from TipTap
}

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  // State to track which formatting groups are active
  const [activeFormats, setActiveFormats] = useState({
    textStyle: '',
    headingLevel: '',
    alignment: 'left',
  });

  // Update the active states when editor selection changes
  useEffect(() => {
    if (!editor) return;

    // Set up a listener for editor selection changes
    const updateActiveFormats = () => {
      // Text styles
      let textStyle = '';
      if (editor.isActive('bold')) textStyle = 'bold';
      else if (editor.isActive('italic')) textStyle = 'italic';
      else if (editor.isActive('underline')) textStyle = 'underline';
      else if (editor.isActive('strike')) textStyle = 'strike';
      
      // Heading level
      let headingLevel = '';
      if (editor.isActive('heading', { level: 1 })) headingLevel = 'h1';
      else if (editor.isActive('heading', { level: 2 })) headingLevel = 'h2';
      else if (editor.isActive('heading', { level: 3 })) headingLevel = 'h3';
      
      // Alignment (requires text-align extension)
      let alignment = 'left';
      if (editor.isActive({ textAlign: 'center' })) alignment = 'center';
      else if (editor.isActive({ textAlign: 'right' })) alignment = 'right';
      else if (editor.isActive({ textAlign: 'justify' })) alignment = 'justify';
      
      setActiveFormats({
        textStyle,
        headingLevel,
        alignment
      });
    };
    
    // Update on selection change
    editor.on('selectionUpdate', updateActiveFormats);
    editor.on('transaction', updateActiveFormats);
    
    // Initial state
    updateActiveFormats();
    
    // Cleanup
    return () => {
      editor.off('selectionUpdate', updateActiveFormats);
      editor.off('transaction', updateActiveFormats);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  // Handler for text style changes
  const handleTextStyleChange = (value: string) => {
    switch (value) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'strike':
        editor.chain().focus().toggleStrike().run();
        break;
    }
  };

  // Handler for heading level changes
  const handleHeadingChange = (value: string) => {
    switch (value) {
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'paragraph':
        editor.chain().focus().setParagraph().run();
        break;
    }
  };

  // Handler for alignment changes
  const handleAlignmentChange = (value: string) => {
    editor.chain().focus().setTextAlign(value).run();
  };

  // Check if the first heading should be locked (for title)
  const isFirstHeading = () => {
    if (!editor) return false;
    
    const { from } = editor.state.selection;
    const firstNode = editor.getJSON().content?.[0];
    
    return firstNode?.type === 'heading' && 
           from <= (firstNode.content?.length || 0) + 1;
  };

  // Disable heading toggles for the first heading if it's the title
  const disableHeadingChange = isFirstHeading();

  return (
    <div className="flex p-1 w-full  max-h-10 items-center overflow-hidden overscroll-none justify-center " >
        {/* Text Styling */}
        <ToggleGroup type="single" size="xs" value={activeFormats.textStyle} onValueChange={handleTextStyleChange}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="strike" aria-label="Strikethrough">
            <Strikethrough className="size-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="h-6 mx-0.5" />

        {/* Headings */}
        <ToggleGroup 
          type="single" 
          size="xs" 
          value={activeFormats.headingLevel} 
          onValueChange={handleHeadingChange} 
          disabled={disableHeadingChange}
        >
          <ToggleGroupItem value="h1" aria-label="Heading 1">
            <Heading1 className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="h2" aria-label="Heading 2">
            <Heading2 className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="h3" aria-label="Heading 3">
            <Heading3 className="size-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="h-6 mx-0.5" />

        {/* Alignment */}
        <ToggleGroup type="single" size="xs" value={activeFormats.alignment} onValueChange={handleAlignmentChange}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="justify" aria-label="Align justify">
            <AlignJustify className="size-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="h-6 mx-0.5" />

        {/* Lists */}
        <ToggleGroup type="single" size="xs">
          <ToggleGroupItem 
            value="bulletList" 
            aria-label="Bullet list"
            pressed={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="orderedList" 
            aria-label="Ordered list"
            pressed={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="indent" 
            aria-label="Indent"
            onClick={() => editor.chain().focus().indent().run()}
          >
            <Indent className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="outdent" 
            aria-label="Outdent"
            onClick={() => editor.chain().focus().outdent().run()}
          >
            <Outdent className="size-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="h-6 mx-0.5" />

        {/* Additional formatting options */}
        <ToggleGroup type="single" size="xs">
          <ToggleGroupItem 
            value="link" 
            aria-label="Add link"
            pressed={editor.isActive('link')}
            onClick={() => {
              const url = window.prompt('URL');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              } else if (editor.isActive('link')) {
                editor.chain().focus().unsetLink().run();
              }
            }}
          >
            <Link className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="image" 
            aria-label="Add image"
            onClick={() => {
              const url = window.prompt('Image URL');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <Image className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="codeBlock" 
            aria-label="Code block"
            pressed={editor.isActive('codeBlock')}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code className="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="blockquote" 
            aria-label="Blockquote"
            pressed={editor.isActive('blockquote')}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="size-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>
    </div>
  );
};
