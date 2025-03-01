import { ChevronRight, Edit, File, FilePlus2, MoreHorizontal, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { getUserId } from "@/lib/stronghold"
import { createDocument, useDocumentStore } from "@/lib/files"
import { Button } from "@/components/ui/button"

export function NavDocuments() {
  const documents = useDocumentStore((state: any) => state.documents)

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between w-full">
        <div>
            Home
        </div>
        <Button variant={"ghost"} size={"icon_sm"} onClick={() => createDocument()}>
          <FilePlus2/>
        </Button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {documents.map((doc: any) => (
            <Collapsible key={doc.filename}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <span>{doc.filename}</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuAction showOnHover>
                  <Edit/>
                </SidebarMenuAction>
              </SidebarMenuItem>
            </Collapsible>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontal />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

