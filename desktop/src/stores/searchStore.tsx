import { DateRange } from 'react-day-picker';
import { create } from 'zustand';
import { subDays } from 'date-fns';

interface SearchState {
	dateRange: DateRange;
	setDateRange: (newDateRange?: DateRange) => void;
}
const useSearchStore = create<SearchState>((set) => ({
  dateRange: {
    from: subDays(new Date(), 21),
    to: new Date()
  },
  setDateRange: (newDateRange?: DateRange) => set({ dateRange: newDateRange }),
}));

export default useSearchStore;
