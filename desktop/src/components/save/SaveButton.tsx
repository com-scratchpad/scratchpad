import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentProps, saveDocument } from "@/api/document";

interface SaveButtonProps {
  title: string;
  content: string;
};

export function SaveButton(props: SaveButtonProps) {
 const handleSave = async () => {
    try {
        await saveDocument(props as DocumentProps);
    } catch (e) {
        console.error("Failed to save document: ", e)
    }
        
  }

  return (
    <div className="flex items-center">
      <Button 
        size={"icon_sm"} 
        variant={"ghost"}
        onClick={handleSave}
      >
        <Save className="h-4 w-4" />
      </Button>
    </div>
  );
}
