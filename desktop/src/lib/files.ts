import { invoke } from "@tauri-apps/api/core";
import { create } from 'zustand'
import { getUserId } from "./stronghold"
import { join, appDataDir } from "@tauri-apps/api/path";
import { readDir, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

// Create user home if does not exist
export const initUserHome = async () => {
    const user_id = await getUserId();
    await invoke("create_user_dir", {dirName: user_id})
}

export const loadDocuments = async (): Promise<Document[]> => {
    const userId = await getUserId();
    if (!userId) {
        console.error("User ID not available.");
        return [];
    }

    const documentsDirPath = await join(await appDataDir(), userId, 'documents');
    console.log(documentsDirPath)
    await invoke("create_user_dir", {dirName: documentsDirPath})

    try {
        const entries = await readDir(documentsDirPath);
        const documents: Document[] = [];

        for (const entry of entries) {
            if (entry.isFile) {
                const filePath = await join(documentsDirPath, entry.name);
                const content = await readTextFile(filePath);
                documents.push({
                    filename: entry.name,
                    path: filePath,
                    content: content,
                });
            }
        }
        return documents;

    } catch (error) {
        console.error("Error reading documents:", error);
        return [];
    }
}

export const createDocument = async () => {
    const userId = await getUserId();
    if (!userId) {
        console.error("User ID not available.");
        return [];
    }

    const filename = "Untitled Document"
    const filepath = await join(await appDataDir(), userId, 'documents', filename);
    
    await writeTextFile(filepath, "Write something here"); 

    console.log("write something here")

    try {
        const documents = await loadDocuments();
        useDocumentStore.getState().setDocuments(documents);
    } catch (error) {
        console.error("Failed to load documents: ", error);
    }
}

interface State {
  documents: Document[]
  addDocuments: any,
  setDocuments: any,
}

interface Document {
  filename: String
  path: String
  content: String
}

export const useDocumentStore: any = create((set) => ({
  documents: [],
  addDocument: (document: Document) => set((state: State) => ({ documents: state.documents.add(document) })),
  setDocuments: (documents: Document[]) => set((state: State) => ({documents: documents}))
}))
