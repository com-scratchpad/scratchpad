import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecentFilesCard from './components/home/recent_files_card';
import TagsCard from './components/home/tags_card';
import NotificationsPanel from './components/home/notification_card';

const MinimalSidebar = () => {
  const files = [
    { id: 1, name: "document.pdf", date: "Today" },
    { id: 2, name: "image.png", date: "Yesterday" },
    { id: 3, name: "code.js", date: "2d ago" },
  ];
  
  const notifications = [
    { id: 1, message: "Sync completed", time: "Just now" },
    { id: 2, message: "New update available", time: "1 hour ago" },
    { id: 3, message: "Backup created", time: "2 hours ago" }
  ];

  // Define your tags
  const [tags, setTags] = useState([
    { id: 1, name: "Work", count: 12 },
    { id: 2, name: "Personal", count: 8 },
    { id: 3, name: "Ideas", count: 5 },
    { id: 4, name: "Projects", count: 7 }
  ]);

  // Track selected tags
  const [selectedTags, setSelectedTags] = useState([]);

  // Handler functions
  const handleAddTag = (tagName) => {
    const newTag = {
      id: Date.now(), // Or any unique ID generation method
      name: tagName,
      count: 0
    };
    setTags([...tags, newTag]);
  };

  const handleSelectTag = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(prev => prev.filter(id => id !== tagId));
  };

  return (
    <div className="w-64 flex flex-col space-y-4 overscroll-y-auto">
      <RecentFilesCard recentFiles={files}/>

      <TagsCard
        tags={tags}
        selectedTags={selectedTags}
        onAddTag={handleAddTag}
        onSelectTag={handleSelectTag}
        onRemoveTag={handleRemoveTag}
      />
      <NotificationsPanel notifications={notifications} />
    </div>
  );
};

export default MinimalSidebar;
