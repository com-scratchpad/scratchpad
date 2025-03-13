import { useState, useRef } from "react";
import { Plus, Check, Tag, X, Hash, Star, FileText, Bookmark, Users, Heart, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Function to get icon based on tag name or category
const getTagIcon = (tagName) => {
  const name = tagName.toLowerCase();
  
  // Add logic to determine which icon to use
  if (name.includes("work") || name.includes("project")) {
    return <FileText size={10} />;
  } else if (name.includes("favorite") || name.includes("important")) {
    return <Star size={10} />;
  } else if (name.includes("people") || name.includes("team")) {
    return <Users size={10} />;
  } else if (name.includes("personal") || name.includes("private")) {
    return <Heart size={10} />;
  } else if (name.includes("later") || name.includes("todo")) {
    return <Clock size={10} />;
  } else if (name.includes("saved") || name.includes("archive")) {
    return <Bookmark size={10} />;
  } else {
    return <Hash size={10} />;
  }
};

const TagsCard = ({ 
  tags, 
  onAddTag, 
  onSelectTag, 
  onRemoveTag, 
  selectedTags = [],
  // Allow custom icon mapping if provided
  tagIconMapping = {}
}) => {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const inputRef = useRef(null);

  const handleAddTag = () => {
    setIsAddingTag(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSaveTag = () => {
    if (newTagName.trim()) {
      onAddTag?.(newTagName.trim());
      setNewTagName("");
    }
    setIsAddingTag(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveTag();
    } else if (e.key === "Escape") {
      setIsAddingTag(false);
      setNewTagName("");
    }
  };

  const handleTagClick = (tagId) => {
    onSelectTag?.(tagId);
  };

  const getIconForTag = (tag) => {
    // Check if there's a custom icon mapping for this tag ID
    if (tagIconMapping[tag.id]) {
      return tagIconMapping[tag.id];
    }
    
    // Otherwise use the auto-detected icon
    return getTagIcon(tag.name);
  };

  return (
    <Card className="border-0 shadow-none px-2 pb-2 pt-1 bg-sidebar rounded rounded-lg">
      <CardHeader className="pb-0.5 pt-0 px-0 flex flex-row justify-between items-center">
        <CardTitle className="text-[10px] font-normal text-sidebar-foreground">Tags</CardTitle>
        {!isAddingTag && (
          <button
            onClick={handleAddTag}
            className="text-muted-foreground hover:text-sidebar-foreground rounded-full p-0.5 hover:bg-sidebar-accent"
            title="Add new tag"
          >
            <Plus size={14} />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-1.5 items-center">
          {isAddingTag ? (
            <div className="flex items-center gap-1 bg-background rounded py-0.5 px-1.5 border">
              <Tag size={12} className="text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-5 text-[10px] border-0 p-0 w-20 focus-visible:ring-0"
                placeholder="New tag..."
              />
              <div className="flex">
                <button
                  onClick={handleSaveTag}
                  className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 p-0.5"
                  title="Save tag"
                >
                  <Check size={12} />
                </button>
                <button
                  onClick={() => setIsAddingTag(false)}
                  className="text-muted-foreground hover:text-sidebar-foreground p-0.5"
                  title="Cancel"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ) : null}
          
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={selectedTags.includes(tag.id) ? "default" : "outline"}
              className={cn(
                "py-0 h-5 text-[10px] font-normal cursor-pointer transition-all",
                selectedTags.includes(tag.id) 
                  ? "bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground border-sidebar-border" 
                  : "bg-sidebar hover:bg-sidebar-accent/50 text-sidebar-foreground border-sidebar-border"
              )}
              onClick={() => handleTagClick(tag.id)}
            >
              <div className="flex items-center gap-1">
                <span className={cn(
                  "text-muted-foreground",
                  selectedTags.includes(tag.id) && "text-sidebar-foreground"
                )}>
                  {getIconForTag(tag)}
                </span>
                <span>{tag.name}</span>
                {selectedTags.includes(tag.id) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveTag?.(tag.id);
                    }}
                    className="ml-0.5 text-muted-foreground hover:text-sidebar-foreground rounded-full"
                    title="Remove tag"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TagsCard;
