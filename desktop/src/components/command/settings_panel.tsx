import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Panel, usePanelStore } from "@/stores/commandStore";
import { cn } from "@/lib/utils";
import { SettingsSidebar } from "@/components/command/settings/SettingsSidebar";
import { NotificationsSettings } from "@/components/command/settings/NotificationsSettings";
import { NavigationSettings } from "@/components/command/settings/NavigationSettings";
import { HomeSettings } from "@/components/command/settings/HomeSettings";
import { AppearanceSettings } from "@/components/command/settings/AppearanceSettings";
import { LanguageRegionSettings } from "@/components/command/settings/LanguageRegionSettings";
import { AccessibilitySettings } from "@/components/command/settings/AccessibilitySettings";
import { ConnectedAccountsSettings } from "@/components/command/settings/ConnectedAccountsSettings";
import { PrivacyVisibilitySettings } from "@/components/command/settings/PrivacyVisibilitySettings";
import { AdvancedSettings } from "@/components/command/settings/AdvancedSettings";
import { HotkeysSettings } from "./settings/HotkeySettings";

export function SettingsPanel() {
  const panel = usePanelStore((state) => state);
  const [activeSection, setActiveSection] = useState<string>("notifications");

  const renderSettingsContent = () => {
    switch (activeSection) {
      case "notifications":
        return <NotificationsSettings />;
      case "navigation":
        return <NavigationSettings />;
      case "home":
        return <HomeSettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "language-region":
        return <LanguageRegionSettings />;
      case "accessibility":
        return <AccessibilitySettings />;
      case "connected-accounts":
        return <ConnectedAccountsSettings />;
      case "privacy-visibility":
        return <PrivacyVisibilitySettings />;
      case "advanced":
        return <AdvancedSettings />;
      case "hotkeys":
        return <HotkeysSettings />
      default:
        return <div className="p-4 text-xs text-muted-foreground">Select a section</div>;
    }
  };

  return (
    <Dialog 
      open={panel.settings} 
      onOpenChange={() => panel.setPanel(Panel.SETTINGS, false)}
    >
      <DialogContent
        className={cn(
          "p-0 gap-0 border rounded-md shadow-lg overflow-hidden",
          "fixed top-[15%] left-1/2 -translate-x-1/2",
          "w-3/5 max-w-4xl h-[66vh]",
          "sm:rounded-lg"
        )}
      >
        <div className="grid grid-cols-[240px_1fr] h-full">
          <SettingsSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          
          {/* Content Area */}
          <div className="bg-background overflow-y-auto">
            {renderSettingsContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
