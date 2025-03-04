import { create } from "zustand";
import { BaseDirectory, exists, writeTextFile } from "@tauri-apps/plugin-fs";
import { getUserId } from "@/lib/stronghold";
import { join } from "@tauri-apps/api/path";

interface DocumentInfo {
    id: string;
    title: string;
    content: string;
}

interface DocumentListState {
    documents: DocumentInfo[];
    addDocument: (document: DocumentInfo) => void;
}

const DOCUMENTS_DIR = "documents"

export const useDocumentStore = create<DocumentListState>((set) => ({
    documents: [],
    addDocument: async (document: DocumentInfo) => {
        //try {
            //const userId = await getUserId() ?? "null";
            //if (userId == "null") {
                //console.error("Failed to add documetn because userId cannot be found");
            //}
            //const filename = await join(userId, DOCUMENTS_DIR, document.id)
            //const fileExists = await exists(filename, { baseDir: BaseDirectory.AppData })
            //if (fileExists) {
                //console.error("File already exists")
            //}
            //await writeTextFile(filename, document.content, { baseDir: BaseDirectory.AppData });
        //} catch (e) {
            //console.error("Failed to add document: ", e);
            //set((state) => state)
        //}
        set((state) => {
            console.log("updating doucments:", [ ...state.documents, document ])
            return {
                documents: [ ...state.documents, document ]
            }
        })
    }
    ,
}));
