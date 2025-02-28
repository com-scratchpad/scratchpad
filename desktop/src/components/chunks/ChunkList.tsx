import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

interface Chunk {
  id: string;
  content: string;
}

interface ChunkListProps {
  chunks: Chunk[];
}

export function ChunkList({ chunks }: { chunks: any[] }) {
  return (
    <div className="flex flex-col h-full">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold">Search Results</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-4 p-4">
          {chunks.map((chunk, index) => (
            <Card key={chunk.id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <p className="text-sm">{chunk.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}