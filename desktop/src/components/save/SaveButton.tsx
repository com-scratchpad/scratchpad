import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  title: string;
  content: string;
};

export function SaveButton(props: SaveButtonProps) {
   
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8000/secure/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          name: props.title,
          file_content: props.content, 
        })
      });
      if(response.ok) {
        const data = await response.json();
        console.log("Saved document with response: ", data);
      }
    } catch (e) {
        console.error("Failed to save document: ", e)
    }
        
  }

  return (
    <div className="flex items-center">
      <Button 
        size={"icon_sm"} 
        variant={"ghost"}
        className="h-6 w-8 min-w-8"
        onClick={handleSave}
      >
        <Save className="h-4 w-4" />
      </Button>
    </div>
  );
}
