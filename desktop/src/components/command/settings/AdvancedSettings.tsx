import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Database, 
  Zap, 
  RefreshCw, 
  Trash2, 
  Download, 
  Upload 
} from "lucide-react";

export function AdvancedSettings() {
  const [advancedSettings, setAdvancedSettings] = useState({
    experimentalFeatures: false,
    autoSync: true,
    telemetry: false
  });

  const updateSetting = <K extends keyof typeof advancedSettings>(
    key: K, 
    value: typeof advancedSettings[K]
  ) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataExport = () => {
    // Implement data export logic
    console.log("Exporting user data");
  };

  const handleDataImport = () => {
    // Implement data import logic
    console.log("Importing user data");
  };

  const handleResetSettings = () => {
    // Implement settings reset logic
    console.log("Resetting all settings");
  };

  const handleClearCache = () => {
    // Implement cache clearing logic
    console.log("Clearing application cache");
  };

  const AdvancedOption = ({ 
    icon: Icon, 
    label, 
    description,
    children 
  }: { 
    icon: React.ElementType, 
    label: string, 
    description?: string,
    children: React.ReactNode 
  }) => (
    <div className="py-1 hover:bg-muted/20 rounded">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">{label}</span>
        </div>
        {children}
      </div>
      {description && (
        <p className="text-[10px] text-muted-foreground pl-5 mt-0.5">{description}</p>
      )}
    </div>
  );

  const DataOption = ({ 
    icon: Icon, 
    label, 
    buttonText,
    onClick,
    variant = "outline"
  }: { 
    icon: React.ElementType, 
    label: string, 
    buttonText: string,
    onClick: () => void,
    variant?: "outline" | "destructive"
  }) => (
    <div className="flex justify-between items-center py-0.5 hover:bg-muted/20 rounded h-7">
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground" />
        <span className="text-xs">{label}</span>
      </div>
      <Button 
        variant={variant} 
        size="sm" 
        className="text-xs h-6 px-2"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );

  return (
    <div className="p-3 space-y-2">
      <h2 className="text-sm font-semibold mb-1">Advanced Settings</h2>
      
      <div className="space-y-1">
        <AdvancedOption 
          icon={Zap} 
          label="Experimental Features"
          description="Enable cutting-edge, unstable features"
        >
          <Switch 
            checked={advancedSettings.experimentalFeatures}
            onCheckedChange={(checked) => updateSetting('experimentalFeatures', checked)}
            className="scale-75 origin-right"
          />
        </AdvancedOption>

        <AdvancedOption 
          icon={RefreshCw} 
          label="Auto Sync"
          description="Automatically sync documents across devices"
        >
          <Switch 
            checked={advancedSettings.autoSync}
            onCheckedChange={(checked) => updateSetting('autoSync', checked)}
            className="scale-75 origin-right"
          />
        </AdvancedOption>

        <AdvancedOption 
          icon={Database} 
          label="Telemetry"
          description="Help improve Mosaic by sending usage data"
        >
          <Switch 
            checked={advancedSettings.telemetry}
            onCheckedChange={(checked) => updateSetting('telemetry', checked)}
            className="scale-75 origin-right"
          />
        </AdvancedOption>

        <h3 className="text-xs font-medium pt-4 pb-1 mt-2 mb-1">Data Management</h3>
        
        <div className="space-y-0.5">
          <DataOption 
            icon={Download} 
            label="Export Data" 
            buttonText="Export"
            onClick={handleDataExport}
          />

          <DataOption 
            icon={Upload} 
            label="Import Data" 
            buttonText="Import"
            onClick={handleDataImport}
          />

          <DataOption 
            icon={Trash2} 
            label="Clear Application Cache" 
            buttonText="Clear"
            variant="destructive"
            onClick={handleClearCache}
          />

          <DataOption 
            icon={Settings} 
            label="Reset All Settings" 
            buttonText="Reset"
            variant="destructive"
            onClick={handleResetSettings}
          />
        </div>
      </div>

      <div className="text-xs text-muted-foreground pt-2 mt-2">
        <p>Caution: Advanced settings can significantly impact your experience.</p>
      </div>
    </div>
  );
}
