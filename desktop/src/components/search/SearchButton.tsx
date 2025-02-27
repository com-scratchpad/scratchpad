import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SearchButtonProps {
  onSearch?: () => void;
  onToggle?: () => void;
  showToggle: boolean;
  navigateOnly: boolean;
}

export function SearchButton({ onSearch, onToggle, showToggle, navigateOnly }: SearchButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateOnly) {
      navigate('/search');
      return;
    }

    if (showToggle && onToggle) {
      onToggle();
    }
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <Button 
      size={"icon_sm"} 
      variant={"ghost"}
      onClick={handleClick}
    >
      <Search className="h-4 w-4" />
    </Button>
  );
}