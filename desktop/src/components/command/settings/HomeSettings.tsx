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
  Star, 
  Clock, 
  Folder, 
  Layout, 
  BookOpen, 
  Settings 
} from "lucide-react";

export function HomeSettings() {
  const [homeSettings, setHomeSettings] = useState({
    landingPage: 'dashboard',
    showQuickStart: true,
    showRecentDocuments: true,
    showFavorites: true,
    defaultWorkspace: 'personal',
    homePageLayout: 'compact'
  });

  const updateSetting = <K extends keyof typeof homeSettings>(
    key: K, 
    value: typeof homeSettings[K]
  ) => {
    setHomeSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const HomeOption = ({ 
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
      <h2 className="text-sm font-semibold mb-1">Home Page Preferences</h2>
      
      <div className="space-y-0.5">
        <HomeOption icon={BookOpen} label="Landing Page">
          <Select 
            value={homeSettings.landingPage}
            onValueChange={(value) => updateSetting('landingPage', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dashboard" className="text-xs">Dashboard</SelectItem>
              <SelectItem value="recent" className="text-xs">Recent Documents</SelectItem>
              <SelectItem value="workspace" className="text-xs">Workspace</SelectItem>
            </SelectContent>
          </Select>
        </HomeOption>

        <HomeOption icon={Settings} label="Home Page Layout">
          <Select 
            value={homeSettings.homePageLayout}
            onValueChange={(value) => updateSetting('homePageLayout', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact" className="text-xs">Compact</SelectItem>
              <SelectItem value="comfortable" className="text-xs">Comfortable</SelectItem>
              <SelectItem value="detailed" className="text-xs">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </HomeOption>

        <HomeOption icon={Folder} label="Default Workspace">
          <Select 
            value={homeSettings.defaultWorkspace}
            onValueChange={(value) => updateSetting('defaultWorkspace', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select workspace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal" className="text-xs">Personal</SelectItem>
              <SelectItem value="team" className="text-xs">Team</SelectItem>
              <SelectItem value="projects" className="text-xs">Projects</SelectItem>
            </SelectContent>
          </Select>
        </HomeOption>

        <h3 className="text-xs font-medium pt-4 mt-4 mb-1 pb-1">Display Options</h3>

        <HomeOption icon={Clock} label="Show Quick Start">
          <Switch 
            checked={homeSettings.showQuickStart}
            onCheckedChange={(checked) => updateSetting('showQuickStart', checked)}
            className="scale-75 origin-right"
          />
        </HomeOption>

        <HomeOption icon={BookOpen} label="Show Recent Documents">
          <Switch 
            checked={homeSettings.showRecentDocuments}
            onCheckedChange={(checked) => updateSetting('showRecentDocuments', checked)}
            className="scale-75 origin-right"
          />
        </HomeOption>

        <HomeOption icon={Star} label="Show Favorites">
          <Switch 
            checked={homeSettings.showFavorites}
            onCheckedChange={(checked) => updateSetting('showFavorites', checked)}
            className="scale-75 origin-right"
          />
        </HomeOption>
      </div>
    </div>
  );
}
