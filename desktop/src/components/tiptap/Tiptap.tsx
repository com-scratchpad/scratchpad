import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Tiptap.css";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Strikethrough, Search } from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

export default () => {
    const { setOpenMobile, setOpen } = useSidebar();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentSummary, setCurrentSummary] = useState("");

    const documentId = undefined;
    const accessToken = undefined;
    
    if (documentId === undefined || accessToken === undefined) {
        console.error("Set documentId and accessToken as hardcoded values in Tiptap.tsx");
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Write something…",
            }),
        ],
        autofocus: true,
        editorProps: {
            attributes: {
                class: "flex-1 h-full overscroll-auto",
            },
        },
        content: ``,
        onUpdate({ editor }) {
            const content = editor.getText();
            invoke("save", { content, documentId, accessToken });
        },
    });

    const handleSearch = async (value: string) => {
        setSearchTerm(value);
        localStorage.setItem("searchTerm", value);
        
        if (value.trim()) {
            try {
                const response = await fetch('http://localhost:8000/secure/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                    },
                    body: JSON.stringify({
                        query: value,
                        matches: 5
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.chunks);
                    const textContents = data.chunks.map((chunk: { content: string; id: string }) => chunk.content);
                    
                    const summaryResponse = await fetch('http://localhost:8000/secure/summarize', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                        },
                        body: JSON.stringify({
                            chunks: textContents,
                            name: `Search: ${value}`
                        })
                    });

                    if (summaryResponse.ok) {
                        const summaryData = await summaryResponse.json();
                        setCurrentSummary(summaryData.summary);
                    }
                }
            } catch (error) {
                console.error('Search or summarize failed:', error);
            }
        }
    };

    useEffect(() => {
        const savedSearch = localStorage.getItem("searchTerm");
        if (savedSearch) setSearchTerm(savedSearch);
    }, []);


    const handleContainerClick = (e: React.MouseEvent) => {
        // Only handle clicks directly on the container
        if (e.target === e.currentTarget) {
            if (editor && !editor.isFocused) {
                editor.commands.focus("end");
            }
            setOpenMobile(false);
            setOpen(false);
        }
    };

    // Add cleanup effect
    // Remove this cleanup effect or modify it
    useEffect(() => {
        return () => {
            setSearchResults([]);
        };
    }, []);

    return (
        <div className="h-full w-full overflow-scroll relative" onClick={handleContainerClick}>
            <div className="fixed top-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-b z-50">
                <div className="w-96 mx-auto flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                    <SidebarTrigger />
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                    />
                </div>
            </div>
        
            <div className="flex flex-col min-h-full">
                <EditorContent editor={editor} className="mx-24 mt-32 text-xs flex-grow" />
                
                {currentSummary && (
                    <div className="mx-24 mb-4 p-4 rounded-lg border bg-background shadow-lg">
                        <h3 className="text-sm font-medium mb-2">Summary</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{currentSummary}</p>
                    </div>
                )}
            </div>
        
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
        </div>
    );
};


