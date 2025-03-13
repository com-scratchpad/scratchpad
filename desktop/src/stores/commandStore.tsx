import { create } from "zustand";

interface PanelState {
	command: boolean;
	generate: boolean;
	editor: boolean;
  search: boolean;
  theme: boolean;
	setPanel: (panel: Panel, isOpen?: boolean) => void;
}

export enum Panel {
  COMMAND = "command",
  GENERATE = "generate",
  EDITOR = "editor",
  THEME = "theme",
  SEARCH = "search"
}

export const usePanelStore = create<PanelState>((set) => ({
	command: false,
	generate: false,
	editor: false,
  theme: false,
  search: false,
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
