import React, { useState } from "react";
import { 
  SunMoon, 
  Palette, 
  Type, 
  Layout, 
  Monitor 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AppearanceSettings() {
  const [settings, setSettings] = useState({
    theme: "system",
    compactMode: false,
    fontSize: "normal",
    density: "default"
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

  const AppearanceOption = ({ 
    icon: Icon, 
    label, 
    children 
  }: { 
    icon: React.ElementType, 
    label: string, 
    children: React.ReactNode 
  }) => (
    <div className="flex items-center justify-between py-0.5 hover:bg-muted/20 rounded h-7">
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground" />
        <span className="text-xs">{label}</span>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-3 space-y-2">
      <h2 className="text-sm font-semibold mb-1">Appearance</h2>
      
      <div className="space-y-0.5">
        <AppearanceOption icon={SunMoon} label="Theme">
          <Select 
            value={settings.theme}
            onValueChange={(value) => updateSetting('theme', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light" className="text-xs">Light</SelectItem>
              <SelectItem value="dark" className="text-xs">Dark</SelectItem>
              <SelectItem value="system" className="text-xs">System</SelectItem>
            </SelectContent>
          </Select>
        </AppearanceOption>
        
        <AppearanceOption icon={Type} label="Font Size">
          <Select 
            value={settings.fontSize}
            onValueChange={(value) => updateSetting('fontSize', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small" className="text-xs">Small</SelectItem>
              <SelectItem value="normal" className="text-xs">Normal</SelectItem>
              <SelectItem value="large" className="text-xs">Large</SelectItem>
            </SelectContent>
          </Select>
        </AppearanceOption>
        
        <h3 className="text-xs font-medium pt-4 pb-1 mt-2 mb-1">Layout Options</h3>
        
        <AppearanceOption icon={Layout} label="Compact Mode">
          <Switch 
            checked={settings.compactMode}
            onCheckedChange={(checked) => updateSetting('compactMode', checked)}
            className="scale-75 origin-right"
          />
        </AppearanceOption>
        
        <AppearanceOption icon={Monitor} label="Workspace Density">
          <Select 
            value={settings.density}
            onValueChange={(value) => updateSetting('density', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select density" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comfortable" className="text-xs">Comfortable</SelectItem>
              <SelectItem value="default" className="text-xs">Default</SelectItem>
              <SelectItem value="compact" className="text-xs">Compact</SelectItem>
            </SelectContent>
          </Select>
        </AppearanceOption>
      </div>
    </div>
  );
}
