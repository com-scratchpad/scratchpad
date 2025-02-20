import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SaveButton() {
  return (
    <div className="flex items-center">
      <Button 
        size={"icon_sm"} 
        variant={"ghost"}
        className="h-6 w-8 min-w-8"
      >
        <Save className="h-4 w-4" />
      </Button>
    </div>
  );
}