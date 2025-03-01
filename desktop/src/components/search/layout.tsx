import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/search/sidebar"
import { SearchPage } from "./content"
 
export default function SearchLayout({}: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger />
        <SearchPage />
    </SidebarProvider>
  )
}

