import { SidebarNavigator, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/generate/sidebar"
import { SearchPage } from "./content"
 
export default function SearchLayout({}: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger />
        <SidebarNavigator />
        <SearchPage />
    </SidebarProvider>
  )
}

