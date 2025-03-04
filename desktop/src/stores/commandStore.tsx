import { create } from "zustand";

interface PanelState {
	command: boolean;
	search: boolean;
	editor: boolean;
	setPanel: (panel: Panel, isOpen?: boolean) => void;
}

export enum Panel {
  COMMAND = "command",
  SEARCH = "search",
  EDITOR = "editor"
}

export const usePanelStore = create<PanelState>((set) => ({
	command: false,
	search: false,
	editor: false,
	setPanel: (panel: Panel, isOpen?: boolean) =>
		set((_) => {
			var newState = {} as PanelState;
			Object.values(Panel).forEach((p) => {
				newState[p] = false;
			});
          if (!isOpen) {
            return newState;
          }
          newState[panel] = true;
          return newState;
		}),
	
}));
