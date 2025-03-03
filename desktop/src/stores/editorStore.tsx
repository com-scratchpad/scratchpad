import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorState {
    documentId: string | undefined;
    documentTitle: string;
    documentHTML: string;
    documentPlainText: string;
    setDocumentId: (id: string) => void;
    setDocumentTitle: (title: string) => void;
    setDocumentHTML: (html: string) => void;
    setDocumentPlainText: (text: string) => void;
    resetDocument: () => void;
}

const useEditorStore = create<EditorState>()(
    persist(
        (set) => ({
            documentId: undefined,
            documentTitle: '',
            documentHTML: '',
            documentPlainText: '',

            setDocumentId: (id: string) => set({ documentId: id }),
            setDocumentTitle: (title: string) => set({ documentTitle: title }),
            setDocumentHTML: (html: string) => set({ documentHTML: html }),
            setDocumentPlainText: (text: string) => set({ documentPlainText: text }),

            resetDocument: () => set({
                documentId: undefined,
                documentTitle: '',
                documentHTML: '',
                documentPlainText: '',
            }),
        }),
        {
            name: 'editor-storage', // unique name for localStorage
        }
    )
);

export default useEditorStore;
