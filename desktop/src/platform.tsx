export const isTauri = (): boolean => {
  return typeof window !== 'undefined' && 
         window !== null && 
         // @ts-ignore
         window.__TAURI__ !== undefined;
};
