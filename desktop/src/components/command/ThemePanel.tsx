import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Panel, usePanelStore } from "@/stores/commandStore";
import { CaseSensitive, Eclipse, MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme/theme";

export function ThemePanel() {
  const panel = usePanelStore((state) => state);
  const theme = useTheme();

  return (
    <CommandDialog
      open={panel.theme}
      onOpenChange={(open) => panel.setPanel(Panel.THEME, open)}
    >
      <CommandList>
        <CommandGroup heading="Theme Options">
          <CommandItem
            onSelect={() => theme.setTheme("light")}
            className="flex justify-between items-center"
          >
            <div className="flex gap-2">
              <CaseSensitive />
              <span>Light theme</span>
            </div>
            <Sun />
          </CommandItem>
          <CommandItem
            onSelect={() => theme.setTheme("dark")}
            className="flex justify-between items-center"
          >
            <div className="flex gap-2">
              <CaseSensitive />
              <span>Dark theme</span>
            </div>
            <Moon />
          </CommandItem>
          <CommandItem
            onSelect={() => theme.setTheme("system")}
            className="flex justify-between items-center"
          >
            <div className="flex gap-2">
              <CaseSensitive />
              <span>System theme</span>
            </div>
            <MonitorCog />
          </CommandItem>
          <CommandItem
            onSelect={() => theme.setTheme(theme.theme === "dark" ? "light" : "dark")}
            className="flex justify-between items-center"
          >
            <div className="flex gap-2">
              <CaseSensitive />
              <span>Toggle theme</span>
            </div>
            <Eclipse />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
