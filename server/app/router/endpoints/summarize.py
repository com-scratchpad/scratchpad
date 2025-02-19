from app.models.summarize import SummarizeRequest


async def summarize(summarize: SummarizeRequest, request):
    chunks_text = "\n\n".join([f"Chunk {i+1}:\n{chunk}" for i, chunk in
                               enumerate(summarize.chunks)])
    openai_client = request.state.openai
    response = openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that combines text chunks into coherent notes. Maintain key information while ensuring smooth transitions and logical flow. Remove redundancies and organize the information clearly."
            },
            {
                "role": "user",
                "content": f"Please combine these text chunks into a single coherent note:\n\n{chunks_text}"
            }
        ],
        temperature=0.2,
        max_tokens=1500
    )
    
    summary = response.choices[0].message.content
    
    
    return {
        "summary": summary,
        "name": summarize.name
    }
