import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default function MoreHorizontal(props: React.ComponentProps<'svg'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
        variant="ghost"
        size="icon_sm"
        className="h-7 w-7 min-w-7"
      >
          <MoreHorizontal className="stroke-zinc-800" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log("New document")}>
          New document
        </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Share document")}>
          Share document
        </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Export")}>
          Export
        </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log("Settings")}>
          Settings
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
