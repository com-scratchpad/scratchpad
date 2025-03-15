// src/components/settings/sections/ProfileSettings.tsx
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    bio: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Implement save logic
    console.log("Saving profile:", profile);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-sm font-semibold">Profile Settings</h2>
      
      {/* Avatar and Basic Info */}
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
          <AvatarFallback className="text-xs">UN</AvatarFallback>
        </Avatar>
        <div>
          <Button variant="outline" size="sm" className="text-xs">
            Change Avatar
          </Button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-3">
        <div className="grid gap-2">
          <Label htmlFor="displayName" className="text-xs">Display Name</Label>
          <Input
            id="displayName"
            name="displayName"
            placeholder="Your display name"
            value={profile.displayName}
            onChange={handleInputChange}
            className="text-xs"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="text-xs">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={profile.email}
            onChange={handleInputChange}
            className="text-xs"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio" className="text-xs">Bio</Label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself"
            value={profile.bio}
            onChange={handleInputChange}
            className="w-full text-xs p-2 border rounded resize-none min-h-[80px]"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          size="sm" 
          className="text-xs"
          onClick={handleSaveProfile}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
