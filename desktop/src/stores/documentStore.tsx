import { create } from "zustand";
import { BaseDirectory, exists, writeTextFile, mkdir, readDir, DirEntry } from "@tauri-apps/plugin-fs";
import { getUserId, initStore } from "@/lib/stronghold";
import { join } from "@tauri-apps/api/path";
import { toast } from "sonner";

interface DocumentInfo {
    id: string;
    title: string;
    content: string;
}

interface DocumentListState {
    documents: DocumentInfo[];
    addDocument: (document: DocumentInfo) => void;
}

const DOCUMENTS_DIRNAME = "documents"

async function fetchDocuments(): Promise<DocumentInfo[]> {
    try {
        await initStore();
        const userId = await getUserId() ?? "null";
        if (userId == "null") {
            console.error("Failed to add document because userId cannot be found");
        }
        const documentsDir = await join(userId, DOCUMENTS_DIRNAME)
        await mkdir(documentsDir, { baseDir: BaseDirectory.AppData, recursive: true })
        const entries: DirEntry[] = await readDir(documentsDir, { baseDir: BaseDirectory.AppData })
        return entries.map((entry) => {
            return {
                id: entry.name,
                title: entry.name,
                content: entry.name,
            }
        })
    } catch (e) {
        console.error("Failed to fetch documents: ", e)
    }
    return []
}

fetchDocuments().then((documents) => {
    useDocumentStore.setState({ documents })
})

export const useDocumentStore = create<DocumentListState>((set) => ({
    documents: [],
    addDocument: async (document: DocumentInfo) => {
        try {
            const userId = await getUserId() ?? "null";
            if (userId == "null") {
                console.error("Failed to add documetn because userId cannot be found");
            }
            const documentsDir = await join(userId, DOCUMENTS_DIRNAME)
            await mkdir(documentsDir, { baseDir: BaseDirectory.AppData, recursive: true })
            const filename = await join(userId, DOCUMENTS_DIRNAME, document.id)
            const fileExists = await exists(filename, { baseDir: BaseDirectory.AppData })
            if (fileExists) {
                console.error("File already exists")
                toast("File already exists")
                return
            }
            await writeTextFile(filename, document.content, { baseDir: BaseDirectory.AppData });
        } catch (e) {
            console.error("Failed to add document: ", e);
            toast("Failed to add document")
            set((state) => state)
        }
        set((state) => {
            return {
                documents: [...state.documents, document]
            }
        })
    }
    ,
}));
