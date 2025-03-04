import { create } from 'zustand';

interface SearchChunk {
    chunk_index: number;
    content: string;
    created_at: string;
    document_id: string;
    id: string;
    similarity: number;
  }

interface ChunksState {
  chunks: SearchChunk[];
  setChunks: (newChunks: SearchChunk[]) => void;
  clearChunks: () => void;
}

const useChunksStore = create<ChunksState>((set) => ({
  chunks: [],
  setChunks: (newChunks: SearchChunk[]) => set({ chunks: newChunks }),
  clearChunks: () => set({ chunks: [] }),
}));

export default useChunksStore;