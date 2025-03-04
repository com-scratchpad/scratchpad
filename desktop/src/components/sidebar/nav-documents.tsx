import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRight, Files, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { useDocumentStore } from "@/stores/documentStore"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

var docId = 1;

export function NavDocuments({
}: {
  }) {
  const documents = useDocumentStore((state) => state);

  const addDocument = async () => {
    const document = {
      id: "f39adb2e-391a-4350-89e7-76a807abdf9" + (docId++),
      title: "document",
      content: "test",
    }
    documents.addDocument(document)
    console.log("adding document", document)
  }

  return (
    <SidebarMenu>
      <Collapsible key={"documents"}>
        <SidebarMenuItem key={"documents"}>
          <SidebarMenuButton asChild isActive={true}>
            <div>
              <Files />
              <span>Documents</span>
              <div className="justify-space-between">
                <Button variant={"ghost"} onClick={() => addDocument()}>
                  <Plus />
                </Button>
              </div>
            </div>
          </SidebarMenuButton>
          <CollapsibleTrigger asChild>
            <SidebarMenuAction
              className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
              showOnHover
            >
              <ChevronRight />
            </SidebarMenuAction>
          </CollapsibleTrigger>
          <CollapsibleContent>

            <SidebarMenuSub>
              {documents.documents.map((document) => (
                <SidebarMenuSubItem key={document.id}>
                  {document.title}
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  )
}
