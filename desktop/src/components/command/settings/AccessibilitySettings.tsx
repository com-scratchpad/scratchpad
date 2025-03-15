import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Keyboard, 
  Eye, 
  Volume2, 
  Type, 
  Contrast, 
  Moon 
} from "lucide-react";

export function AccessibilitySettings() {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    keyboardNavigation: true,
    highContrastMode: false,
    screenReaderSupport: true,
    fontSize: 'medium',
    colorBlindMode: 'none',
    reduceMotion: false
  });

  const updateSetting = <K extends keyof typeof accessibilitySettings>(
    key: K, 
    value: typeof accessibilitySettings[K]
  ) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const AccessibilityOption = ({ 
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
      <h2 className="text-sm font-semibold mb-1">Accessibility</h2>
      
      <div className="space-y-0.5">
        <AccessibilityOption icon={Keyboard} label="Keyboard Navigation">
          <Switch 
            checked={accessibilitySettings.keyboardNavigation}
            onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
            className="scale-75 origin-right"
          />
        </AccessibilityOption>

        <AccessibilityOption icon={Eye} label="Screen Reader Support">
          <Switch 
            checked={accessibilitySettings.screenReaderSupport}
            onCheckedChange={(checked) => updateSetting('screenReaderSupport', checked)}
            className="scale-75 origin-right"
          />
        </AccessibilityOption>

        <h3 className="text-xs font-medium pt-4 pb-1 mt-2 mb-1">Display Adaptations</h3>

        <AccessibilityOption icon={Type} label="Font Size">
          <Select 
            value={accessibilitySettings.fontSize}
            onValueChange={(value) => updateSetting('fontSize', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small" className="text-xs">Small</SelectItem>
              <SelectItem value="medium" className="text-xs">Medium</SelectItem>
              <SelectItem value="large" className="text-xs">Large</SelectItem>
              <SelectItem value="xlarge" className="text-xs">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </AccessibilityOption>

        <AccessibilityOption icon={Contrast} label="High Contrast Mode">
          <Switch 
            checked={accessibilitySettings.highContrastMode}
            onCheckedChange={(checked) => updateSetting('highContrastMode', checked)}
            className="scale-75 origin-right"
          />
        </AccessibilityOption>

        <AccessibilityOption icon={Eye} label="Color Blind Mode">
          <Select 
            value={accessibilitySettings.colorBlindMode}
            onValueChange={(value) => updateSetting('colorBlindMode', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none" className="text-xs">None</SelectItem>
              <SelectItem value="deuteranopia" className="text-xs">Deuteranopia</SelectItem>
              <SelectItem value="protanopia" className="text-xs">Protanopia</SelectItem>
              <SelectItem value="tritanopia" className="text-xs">Tritanopia</SelectItem>
            </SelectContent>
          </Select>
        </AccessibilityOption>

        <AccessibilityOption icon={Moon} label="Reduce Motion">
          <Switch 
            checked={accessibilitySettings.reduceMotion}
            onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
            className="scale-75 origin-right"
          />
        </AccessibilityOption>
      </div>
    </div>
  );
}
