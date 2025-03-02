import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { usePanelStore, Panel } from "@/stores/commandStore";
import { SearchPanel } from "@/components/command/SearchPanel"

export function CommandDialogDemo() {
  const panel = usePanelStore((state) => state);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        Object.values(Panel).forEach((panelKey) => {
          if (panel[panelKey] && panelKey !== Panel.COMMAND) {
            panel.setPanel(panelKey, false);
          }
        });
        panel.setPanel(Panel.COMMAND, !panel.command);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [panel]);

  return (
    <>
      <CommandDialog
        open={panel.command}
        onOpenChange={(open) => panel.setPanel(Panel.COMMAND, open)}
      >
        <CommandInput
          className="max-h-10"
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => panel.setPanel(Panel.SEARCH, true)}>
              <Search />
              <span>Search</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
