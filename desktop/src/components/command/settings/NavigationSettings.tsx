import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Grip, 
  Layout, 
  Columns, 
  SidebarClose, 
  SidebarOpen 
} from "lucide-react";

export function NavigationSettings() {
  const [settings, setSettings] = useState({
    defaultView: 'list',
    sidebarPosition: 'left',
    compactSidebar: false,
    showRecentDocuments: true,
    showFavorites: true
  });

  const updateSetting = <K extends keyof typeof settings>(
    key: K, 
    value: typeof settings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const NavigationOption = ({ 
    label, 
    children 
  }: { 
    label: string, 
    children: React.ReactNode 
  }) => (
    <div className="flex items-center justify-between py-0.5 hover:bg-muted/20 rounded h-7">
      <span className="text-xs">{label}</span>
      {children}
    </div>
  );

  return (
    <div className="p-3 space-y-2">
      <h2 className="text-sm font-semibold mb-1">Navigation Preferences</h2>
      
      <div className="space-y-0.5">
        <NavigationOption label="Default View">
          <Select 
            value={settings.defaultView}
            onValueChange={(value) => updateSetting('defaultView', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <Columns className="size-3.5" />
                  List
                </div>
              </SelectItem>
              <SelectItem value="grid" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <Grip className="size-3.5" />
                  Grid
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </NavigationOption>
        <NavigationOption label="Sidebar Position">
          <Select 
            value={settings.sidebarPosition}
            onValueChange={(value) => updateSetting('sidebarPosition', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <SidebarOpen className="size-3.5" />
                  Left
                </div>
              </SelectItem>
              <SelectItem value="right" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <SidebarClose className="size-3.5" />
                  Right
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </NavigationOption>
        <NavigationOption label="Compact Sidebar">
          <Switch 
            checked={settings.compactSidebar}
            onCheckedChange={(checked) => updateSetting('compactSidebar', checked)}
            className="scale-75 origin-right"
          />
        </NavigationOption>

        <h3 className="text-xs font-medium pt-4 pb-1 mt-2 mb-1">Display Options</h3>
        
        <NavigationOption label="Show Recent Documents">
          <Switch 
            checked={settings.showRecentDocuments}
            onCheckedChange={(checked) => updateSetting('showRecentDocuments', checked)}
            className="scale-75 origin-right"
          />
        </NavigationOption>
        <NavigationOption label="Show Favorites">
          <Switch 
            checked={settings.showFavorites}
            onCheckedChange={(checked) => updateSetting('showFavorites', checked)}
            className="scale-75 origin-right"
          />
        </NavigationOption>
      </div>
    </div>
  );
}
