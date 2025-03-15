import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageCircle, UserPlus, Star, Edit } from "lucide-react";

export function NotificationsSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    inAppNotifications: true,
    commentMentions: true,
    newFollowers: true,
    documentEdits: true,
    documentStars: true
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const NotificationToggle = ({ 
    icon: Icon, 
    label, 
    checked, 
    onToggle 
  }: { 
    icon: React.ElementType, 
    label: string, 
    checked: boolean, 
    onToggle: () => void 
  }) => (
    <div className="flex items-center justify-between py-0.5 hover:bg-muted/20 rounded h-7">
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground" />
        <span className="text-xs">{label}</span>
      </div>
      <Switch 
        checked={checked}
        onCheckedChange={onToggle}
        className="scale-75 origin-right"
      />
    </div>
  );

  return (
    <div className="p-3 space-y-2">
      <h2 className="text-sm font-semibold mb-1">Notification Preferences</h2>
      
      <div className="space-y-0.5">
        <NotificationToggle 
          icon={Mail}
          label="Email Notifications"
          checked={notifications.emailNotifications}
          onToggle={() => toggleNotification('emailNotifications')}
        />
        <NotificationToggle 
          icon={Bell}
          label="In-App Notifications"
          checked={notifications.inAppNotifications}
          onToggle={() => toggleNotification('inAppNotifications')}
        />
      </div>
      <h3 className="text-xs font-medium pt-4 mt-2 mb-1">Notify Me About</h3>
      <div className="space-y-0.5">
        <NotificationToggle 
          icon={MessageCircle}
          label="Comment Mentions"
          checked={notifications.commentMentions}
          onToggle={() => toggleNotification('commentMentions')}
        />
        <NotificationToggle 
          icon={UserPlus}
          label="New Followers"
          checked={notifications.newFollowers}
          onToggle={() => toggleNotification('newFollowers')}
        />
        <NotificationToggle 
          icon={Edit}
          label="Document Edits"
          checked={notifications.documentEdits}
          onToggle={() => toggleNotification('documentEdits')}
        />
        <NotificationToggle 
          icon={Star}
          label="Document Stars"
          checked={notifications.documentStars}
          onToggle={() => toggleNotification('documentStars')}
        />
      </div>
    </div>
  );
}
