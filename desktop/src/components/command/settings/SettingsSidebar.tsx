import { 
  Bell, 
  Menu, 
  Home, 
  Paintbrush, 
  Globe, 
  Keyboard, 
  Link, 
  Lock, 
  Settings 
} from "lucide-react";

export const settingsSections = [
  { 
    id: "notifications", 
    icon: Bell, 
    label: "Notifications" 
  },
  {
    id: "hotkeys",
    icon: Keyboard,
    label: "Hotkeys"
  },
  { 
    id: "navigation", 
    icon: Menu, 
    label: "Navigation" 
  },
  { 
    id: "home", 
    icon: Home, 
    label: "Home" 
  },
  { 
    id: "appearance", 
    icon: Paintbrush, 
    label: "Appearance" 
  },
  { 
    id: "language-region", 
    icon: Globe, 
    label: "Language & Region" 
  },
  { 
    id: "accessibility", 
    icon: Keyboard, 
    label: "Accessibility" 
  },
  { 
    id: "connected-accounts", 
    icon: Link, 
    label: "Connected Accounts" 
  },
  { 
    id: "privacy-visibility", 
    icon: Lock, 
    label: "Privacy & Visibility" 
  },
  { 
    id: "advanced", 
    icon: Settings, 
    label: "Advanced" 
  }
];

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsSidebar({ 
  activeSection, 
  onSectionChange 
}: SettingsSidebarProps) {
  return (
    <div className="bg-muted/30 border-r p-2 space-y-1 overflow-y-auto">
      {settingsSections.map((section) => {
        const Icon = section.icon;
        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`
              w-full flex items-center justify-between p-2 rounded-md text-xs
              ${activeSection === section.id 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-muted/50"}
            `}
          >
            <div className="flex items-center gap-2">
              <Icon className="size-4" />
              {section.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
