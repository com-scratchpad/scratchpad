import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface TelescopeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

// Custom dialog component specifically for the Telescope panel
export function TelescopeDialog({
  open,
  onOpenChange,
  className,
  children,
}: TelescopeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-0 gap-0 border rounded-md shadow-lg overflow-hidden",
          "fixed top-[15%] left-1/2 -translate-x-1/2",
          "w-3/5 max-w-4xl h-[66vh]",
          "sm:rounded-lg",
          className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
