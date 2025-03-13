import { getToken } from '@/lib/stronghold';
import useSummaryStore from '@/stores/summaryStore';

/**
 * 
 * @param query - Search string used to find the relevant documents
 * @param textContents - List of document contents to summarize
 * @returns A JSON response of the request
 * @throws Error - If the summary fails to generate
 */
export async function summarize(query: string, textContents: string[]) {

    const setSummary = useSummaryStore.getState().setSummary;
    const token = await getToken();
    const summaryResponse = await fetch('http://localhost:8000/secure/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          'chunks': textContents,
          'name': `Search: ${query}`
        })
    });

    if (summaryResponse.ok) {
        const data = await summaryResponse.json();
        setSummary(data.summary);
        return data;
    }

    throw new Error(`Failed to get summary: ${summaryResponse}`)
}

/**
 * 
 * @param query - Search string used to find the relevant documents
 * @returns - JSON response from the API call
 * @throws - Error when the search fails
 */
export async function search_chunks(query: string) {
    const token = await getToken();
    const searchResponse = await fetch('http://localhost:8000/secure/search_chunks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: query, 
          matches: 5
        })
    });

    if (searchResponse.ok) {
        return await searchResponse.json();
    }

    throw new Error(`Search failed: ${searchResponse}`);
}

export type DocumentProps = {
    title: string;
    content: string;
}

/**
 * Search for documents with optional file type filtering
 * @param query Search query string
 * @param fileType Optional file type filter (e.g., 'pdf', 'txt')
 * @returns Search results from the server
 */
export async function searchDocuments(query: string, fileType?: string) {
  try {
    const token = await getToken();
    const response = await fetch('http://localhost:8000/secure/file_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        file_type: fileType
      })
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error(`Failed to search documents: ${response.statusText}`);
  } catch (error) {
    console.error('Error searching documents:', error);
    return null;
  }
}

/**
 * 
 * @param props - DocumentProps which contains the title and content of the document
 * @throws Error - If the document fails to save
 */
export async function saveDocument(props: DocumentProps) {
    const { title, content } = props;
    const token = await getToken();
    const response = await fetch('http://localhost:8000/secure/document', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
        name: title,
        file_content: content, 
        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Saved document with response: ", data);
        return;
    }
    throw new Error(`Failed to save document: ${response}`);
}