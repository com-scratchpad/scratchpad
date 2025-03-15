import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

// Define editor state that will be stored per tab
export interface EditorState {
  scrollPosition: number;
  cursorPosition: number;
  selection: {
    from: number;
    to: number;
  } | null;
  activeFormats: {
    textStyle: string;
    headingLevel: string;
    alignment: string;
    listType: string | null;
  };
}

// Extended Tab interface with editor state
export interface Tab {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  editorState: EditorState;
}

// Default editor state
const createDefaultEditorState = (): EditorState => ({
  scrollPosition: 0,
  cursorPosition: 0,
  selection: null,
  activeFormats: {
    textStyle: '',
    headingLevel: '',
    alignment: 'left',
    listType: null
  }
});

interface TabState {
  tabs: Tab[];
  activeTabId: string | null;
  
  // Tab operations
  createTab: (title?: string, content?: string) => string;
  updateTab: (id: string, updates: Partial<Omit<Tab, 'id' | 'createdAt' | 'editorState'>>) => void;
  deleteTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  getActiveTab: () => Tab | undefined;
  
  // Editor state operations
  updateEditorState: (id: string, updates: Partial<EditorState>) => void;
  updateActiveEditorState: (updates: Partial<EditorState>) => void;
  getEditorState: (id: string) => EditorState | undefined;
  
  // Format state convenience methods
  setFormatState: (id: string, formats: Partial<EditorState['activeFormats']>) => void;
  
  // Content getters/setters that operate on the active tab
  getContent: () => string;
  setContent: (content: string) => void;
  getTitle: () => string;
  setTitle: (title: string) => void;
}

export const useTabStore = create<TabState>()(
  persist(
    (set, get) => ({
      tabs: [],
      activeTabId: null,
      
      createTab: (title = 'Untitled', content = '<h1></h1><p></p>') => {
        const id = nanoid();
        const now = Date.now();
        const newTab: Tab = {
          id,
          title,
          content,
          createdAt: now,
          updatedAt: now,
          editorState: createDefaultEditorState()
        };
        
        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: id,
        }));
        
        return id;
      },
      
      updateTab: (id, updates) => {
        set((state) => ({
          tabs: state.tabs.map((tab) => 
            tab.id === id 
              ? { 
                  ...tab, 
                  ...updates, 
                  updatedAt: Date.now() 
                } 
              : tab
          )
        }));
      },
      
      deleteTab: (id) => {
        const { tabs, activeTabId } = get();
        const filteredTabs = tabs.filter((tab) => tab.id !== id);
        
        // If we're deleting the active tab, switch to another tab
        let newActiveId = activeTabId;
        if (activeTabId === id) {
          const idx = tabs.findIndex((tab) => tab.id === id);
          if (filteredTabs.length > 0) {
            // Prefer the tab to the right, or if none, the tab to the left
            newActiveId = filteredTabs[Math.min(idx, filteredTabs.length - 1)].id;
          } else {
            newActiveId = null;
          }
        }
        
        set({
          tabs: filteredTabs,
          activeTabId: newActiveId,
        });
      },
      
      setActiveTab: (id) => {
        set({ activeTabId: id });
      },
      
      getActiveTab: () => {
        const { tabs, activeTabId } = get();
        return tabs.find((tab) => tab.id === activeTabId);
      },
      
      updateEditorState: (id, updates) => {
        // Only update if there are actually changes
        set((state) => ({
          tabs: state.tabs.map((tab) => 
            tab.id === id 
              ? { 
                  ...tab, 
                  editorState: { ...tab.editorState, ...updates },
                } 
              : tab
          )
        }));
      },
      
      updateActiveEditorState: (updates) => {
        const { activeTabId } = get();
        if (activeTabId) {
          get().updateEditorState(activeTabId, updates);
        }
      },
      
      getEditorState: (id) => {
        const tab = get().tabs.find(tab => tab.id === id);
        return tab?.editorState;
      },
      
      // Format state convenience methods
      setFormatState: (id, formats) => {
        const tab = get().tabs.find(tab => tab.id === id);
        if (tab) {
          get().updateEditorState(id, {
            activeFormats: { ...tab.editorState.activeFormats, ...formats }
          });
        }
      },
      
      // Content getters/setters
      getContent: () => {
        const activeTab = get().getActiveTab();
        return activeTab?.content || '';
      },
      
      setContent: (content) => {
        const { activeTabId } = get();
        if (activeTabId) {
          get().updateTab(activeTabId, { content });
        }
      },
      
      getTitle: () => {
        const activeTab = get().getActiveTab();
        return activeTab?.title || 'Untitled';
      },
      
      setTitle: (title) => {
        const { activeTabId } = get();
        if (activeTabId) {
          get().updateTab(activeTabId, { title });
        }
      },
    }),
    {
      name: 'editor-tabs',
      partialize: (state) => ({
        tabs: state.tabs.map(tab => ({
          ...tab,
          // Don't persist selection state
          editorState: {
            ...tab.editorState,
            selection: null,
          }
        })),
        activeTabId: state.activeTabId
      }),
    }
  )
);
