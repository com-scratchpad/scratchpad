import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FileIcon, UserIcon, CalendarIcon, TagIcon } from "lucide-react";

interface ChunkProps {
  content: string;
  metadata?: {
    date?: string;
    author?: string;
    filepath?: string;
    tags?: string[];
    note?: string;
  };
}

export function Chunk({ content, metadata }: ChunkProps) {
  return (
    <Card className="group relative overflow-hidden border-transparent bg-transparent shadow-none hover:cursor-pointer
      hover:bg-accent/10 
      transition-colors 
      duration-200 
      ease-in-out 
      hover:scale-[101%] 
      active:scale-[99.5%]
      ">
      <CardContent className="relative z-10 pb-2">
        <div className="text-foreground/80 text-xs leading-relaxed 
          bg-gradient-to-b from-foreground/20 via-foreground/70 to-foreground/20 
          bg-clip-text text-transparent">
          {content}
        </div>
      </CardContent>
      
      {metadata && (
        <CardFooter className="px-5 pb-4 pt-0 flex flex-wrap items-center gap-1 relative z-10">
          {metadata.date && (
            <HoverCard>
              <HoverCardTrigger>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CalendarIcon size={12} className="text-muted-foreground" />
                  <span className="text-[0.65rem]">
                    {new Date(metadata.date).toLocaleDateString()}
                  </span>
                </Badge>
              </HoverCardTrigger>
            </HoverCard>
          )}
          
          {metadata.author && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <UserIcon size={12} className="text-muted-foreground" />
              <span className="text-[0.65rem]">{metadata.author}</span>
            </Badge>
          )}
          
          {metadata.filepath && (
            <HoverCard>
              <HoverCardTrigger>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <FileIcon size={12} className="text-muted-foreground" />
                  <span className="text-[0.65rem] truncate max-w-[100px]">
                    {metadata.filepath.split('/').pop()}
                  </span>
                </Badge>
              </HoverCardTrigger>
            </HoverCard>
          )}
          
          {metadata.tags && metadata.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1">
              <TagIcon size={10} className="text-muted-foreground" />
              <span className="text-[0.6rem]">{tag}</span>
            </Badge>
          ))}
          
          {metadata.note && (
            <HoverCard>
              <HoverCardTrigger>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span className="text-[0.65rem] text-muted-foreground">Note</span>
                </Badge>
              </HoverCardTrigger>
            </HoverCard>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
