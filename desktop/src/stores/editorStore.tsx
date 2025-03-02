import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorState {
	documentId: string | undefined;
    documentTitle: string;
    documentContent: string;
    setDocumentId: (id: string) => void;
    setDocumentTitle: (title: string) => void;
    setDocumentContent: (content: string) => void;
    resetDocument: () => void;
}

const useEditorStore = create<EditorState>()(
    persist(
      (set) => ({
        documentId: undefined,
        documentTitle: '',
        documentContent: '',
        
        setDocumentId: (id: string) => set({ documentId: id }),
        setDocumentTitle: (title: string) => set({ documentTitle: title }),
        setDocumentContent: (content: string) => set({ documentContent: content }),
        
        resetDocument: () => set({ 
          documentId: undefined, 
          documentTitle: '', 
          documentContent: '' 
        }),
      }),
      {
        name: 'editor-storage', // unique name for localStorage
      }
    )
  );

export default useEditorStore;
