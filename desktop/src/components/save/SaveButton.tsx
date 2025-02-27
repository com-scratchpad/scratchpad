import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/stronghold";

interface SaveButtonProps {
  title: string;
  content: string;
};

export function SaveButton(props: SaveButtonProps) {
 const handleSave = async () => {
    const tokenData = await getToken();
    console.log("Token data: ", tokenData);
    // const token = tokenData?.token;
    try {
      const response = await fetch('http://localhost:8000/secure/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData}`,
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
        onClick={handleSave}
      >
        <Save className="h-4 w-4" />
      </Button>
    </div>
  );
}
