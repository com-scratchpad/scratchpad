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
  Lock, 
  Eye, 
  Globe, 
  Users, 
  UserCheck, 
  Shield 
} from "lucide-react";

export function PrivacyVisibilitySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    documentDefaultVisibility: 'private',
    discoverabilityEnabled: false,
    followRequestsApproval: true,
    collaborationInvites: 'following',
    activityTracking: false
  });

  const updateSetting = <K extends keyof typeof privacySettings>(
    key: K, 
    value: typeof privacySettings[K]
  ) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const PrivacyOption = ({ 
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
      <h2 className="text-sm font-semibold mb-1">Privacy & Visibility</h2>
      
      <div className="space-y-0.5">
        <PrivacyOption icon={Eye} label="Profile Visibility">
          <Select 
            value={privacySettings.profileVisibility}
            onValueChange={(value) => updateSetting('profileVisibility', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <Lock className="size-3.5" /> Private
                </div>
              </SelectItem>
              <SelectItem value="followers" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <Users className="size-3.5" /> Followers
                </div>
              </SelectItem>
              <SelectItem value="public" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <Globe className="size-3.5" /> Public
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </PrivacyOption>

        <PrivacyOption icon={Lock} label="Default Document Visibility">
          <Select 
            value={privacySettings.documentDefaultVisibility}
            onValueChange={(value) => updateSetting('documentDefaultVisibility', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <Lock className="size-3.5" /> Private
                </div>
              </SelectItem>
              <SelectItem value="workspace" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <Users className="size-3.5" /> Workspace
                </div>
              </SelectItem>
              <SelectItem value="public" className="text-xs">
                <div className="flex items-center gap-1.5">
                  <Globe className="size-3.5" /> Public
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </PrivacyOption>

        <h3 className="text-xs font-medium pt-4 pb-1 mt-2 mb-1">Access Controls</h3>

        <PrivacyOption icon={UserCheck} label="Follow Requests">
          <Switch 
            checked={privacySettings.followRequestsApproval}
            onCheckedChange={(checked) => updateSetting('followRequestsApproval', checked)}
            className="scale-75 origin-right"
          />
        </PrivacyOption>

        <PrivacyOption icon={Users} label="Collaboration Invites">
          <Select 
            value={privacySettings.collaborationInvites}
            onValueChange={(value) => updateSetting('collaborationInvites', value)}
          >
            <SelectTrigger className="w-[100px] h-7 text-xs">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anyone" className="text-xs">Anyone</SelectItem>
              <SelectItem value="following" className="text-xs">Following Only</SelectItem>
              <SelectItem value="workspace" className="text-xs">Workspace</SelectItem>
            </SelectContent>
          </Select>
        </PrivacyOption>

        <PrivacyOption icon={Globe} label="Profile Discoverability">
          <Switch 
            checked={privacySettings.discoverabilityEnabled}
            onCheckedChange={(checked) => updateSetting('discoverabilityEnabled', checked)}
            className="scale-75 origin-right"
          />
        </PrivacyOption>

        <PrivacyOption icon={Shield} label="Activity Tracking">
          <Switch 
            checked={privacySettings.activityTracking}
            onCheckedChange={(checked) => updateSetting('activityTracking', checked)}
            className="scale-75 origin-right"
          />
        </PrivacyOption>
      </div>

      <div className="text-xs text-muted-foreground pt-2 mt-2">
        <p>Control who can see your profile, documents, and activity.</p>
      </div>
    </div>
  );
}
