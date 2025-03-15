import { Button } from "@/components/ui/button";
import { MoreHorizontal, Settings, LogOut, Moon, Sun, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme/theme";

// Simple checkmark icon component
const CheckMarkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Settings dropdown component
export const SettingsDropdown = ({ 
  onSettings, 
  onLogout 
}: { 
  onSettings: () => void,
  onLogout: () => void
}) => {
  // Use ShadCN's theme hook
  const { theme, setTheme } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 rounded-sm"
          data-tauri-drag-region={false}
        >
          <MoreHorizontal size={16} />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 text-xs" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={() => setTheme("light")}
            className="text-xs h-7 py-1"
          >
            <Sun className="mr-2 h-3.5 w-3.5" />
            <span>Light</span>
            {theme === "light" && <CheckMarkIcon className="ml-auto h-3.5 w-3.5" />}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")}
            className="text-xs h-7 py-1"
          >
            <Moon className="mr-2 h-3.5 w-3.5" />
            <span>Dark</span>
            {theme === "dark" && <CheckMarkIcon className="ml-auto h-3.5 w-3.5" />}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("system")}
            className="text-xs h-7 py-1"
          >
            <Monitor className="mr-2 h-3.5 w-3.5" />
            <span>System</span>
            {theme === "system" && <CheckMarkIcon className="ml-auto h-3.5 w-3.5" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onSelect={onSettings}
          className="text-xs h-7 py-1"
        >
          <Settings className="mr-2 h-3.5 w-3.5" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onSelect={() => onLogout()} 
          className="text-red-500 focus:text-red-500 text-xs h-7 py-1"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
