import { SidebarNavigator, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/generate/sidebar"
import { GeneratePage } from "./content"
 
export default function GenerateLayout({}: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger />
        <SidebarNavigator />
        <GeneratePage />
    </SidebarProvider>
  )
}

