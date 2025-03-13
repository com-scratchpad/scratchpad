import { create } from "zustand";

interface PanelState {
	command: boolean;
	search: boolean;
	generate: boolean;
	editor: boolean;
  	theme: boolean;
	setPanel: (panel: Panel, isOpen?: boolean) => void;
}

export enum Panel {
  COMMAND = "command",
  SEARCH = "search",
  GENERATE = "generate",
  EDITOR = "editor",
  THEME = "theme"
  
}

export const usePanelStore = create<PanelState>((set) => ({
	command: false,
	search: false,
	generate: false,
	editor: false,
  	theme: false,
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
