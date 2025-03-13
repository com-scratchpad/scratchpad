from fastapi import Request, Response
from app.models.file_search import FileSearchRequest, FileSearchResponse
from app.logging import logger

async def file_search(search: FileSearchRequest, request: Request) -> FileSearchResponse:
    try:
        search_results = request.state.supabase.rpc(
            "prioritized_document_search",
            {
                "p_search_term": search.query,
                "p_user_id": request.state.user_id,
                "p_file_type": search.file_type
            }
        ).execute()

        return FileSearchResponse(results=search_results.data)
        
    except Exception as e:
        print(f"Debug - Search error: {e}")
        return {"error": str(e)}