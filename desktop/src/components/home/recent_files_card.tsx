import { FileText, Image, Music, Video, Code, Archive, File } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Function to determine icon based on file extension or type
const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  // Using semantic colors based on file types that work in both light and dark modes
  switch (extension) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
    case 'rtf':
      return <FileText size={16} className="text-muted-foreground/75" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
    case 'webp':
      return <Image size={16} className="text-muted-foreground/75" />;
    case 'mp3':
    case 'wav':
    case 'ogg':
      return <Music size={16} className="text-muted-foreground/75" />;
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'webm':
      return <Video size={16} className="text-muted-foreground/75" />;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'html':
    case 'css':
    case 'py':
    case 'java':
      return <Code size={16} className="text-muted-foreground/75" />;
    case 'zip':
    case 'rar':
    case '7z':
      return <Archive size={16} className="text-muted-foreground/75"/>;
    default:
      return <File size={16} className="text-muted-foreground/75" />;
  }
};

const RecentFilesCard = ({ recentFiles }) => {
  return (
    <Card className="border-0 shadow-none bg-sidebar p-2 rounded rounded-lg">
      <CardHeader className="pb-1 pt-0 px-0">
        <CardTitle className="text-[10px] font-normal text-sidebar-foreground">Recently Edited</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-0.5">
          {recentFiles.map((file) => (
            <li 
              key={file.id} 
              className="text-[10px] py-1 px-1 hover:bg-sidebar-accent rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  {getFileIcon(file.name)}
                  <span className="truncate text-sidebar-foreground">{file.name}</span>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{file.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentFilesCard;
