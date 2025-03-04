import { create } from 'zustand';

interface SummaryState {
  summary: string;
  setSummary: (newSummary: string) => void;
  clearSummary: () => void;
}

const useSummaryStore = create<SummaryState>((set) => ({
  summary: '',
  setSummary: (newSummary: string) => set({ summary: newSummary }),
  clearSummary: () => set({ summary: '' }),
}));

export default useSummaryStore;