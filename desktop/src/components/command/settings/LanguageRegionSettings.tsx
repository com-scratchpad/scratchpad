import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Globe, 
  Clock, 
  Calendar 
} from "lucide-react";

export function LanguageRegionSettings() {
  const [settings, setSettings] = useState({
    language: 'en-US',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    firstDayOfWeek: 'sunday'
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

  const LanguageOption = ({ 
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
      <h2 className="text-sm font-semibold mb-1">Language & Region</h2>
      
      <div className="space-y-0.5">
        <LanguageOption icon={Globe} label="Language">
          <Select 
            value={settings.language}
            onValueChange={(value) => updateSetting('language', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US" className="text-xs">English (US)</SelectItem>
              <SelectItem value="en-UK" className="text-xs">English (UK)</SelectItem>
              <SelectItem value="es-ES" className="text-xs">Español</SelectItem>
              <SelectItem value="fr-FR" className="text-xs">Français</SelectItem>
              <SelectItem value="de-DE" className="text-xs">Deutsch</SelectItem>
              <SelectItem value="zh-CN" className="text-xs">中文 (简体)</SelectItem>
              <SelectItem value="ja-JP" className="text-xs">日本語</SelectItem>
            </SelectContent>
          </Select>
        </LanguageOption>

        <h3 className="text-xs font-medium pt-4 pb-1 mt-2 mb-1">Format Options</h3>
        
        <LanguageOption icon={Calendar} label="Date Format">
          <Select 
            value={settings.dateFormat}
            onValueChange={(value) => updateSetting('dateFormat', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY" className="text-xs">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY" className="text-xs">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD" className="text-xs">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </LanguageOption>

        <LanguageOption icon={Clock} label="Time Format">
          <Select 
            value={settings.timeFormat}
            onValueChange={(value) => updateSetting('timeFormat', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12h" className="text-xs">12-hour</SelectItem>
              <SelectItem value="24h" className="text-xs">24-hour</SelectItem>
            </SelectContent>
          </Select>
        </LanguageOption>

        <LanguageOption icon={Calendar} label="First Day of Week">
          <Select 
            value={settings.firstDayOfWeek}
            onValueChange={(value) => updateSetting('firstDayOfWeek', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sunday" className="text-xs">Sunday</SelectItem>
              <SelectItem value="monday" className="text-xs">Monday</SelectItem>
            </SelectContent>
          </Select>
        </LanguageOption>
      </div>
    </div>
  );
}
