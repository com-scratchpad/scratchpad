import * as React from "react";
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";


import SignOutButton from "./signout";
import { NavDocuments } from "./nav-documents";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader className="pt-9">
                Mosiac
                <NavDocuments/>
            </SidebarHeader>
            <SidebarRail />
            <SidebarFooter>
                <SignOutButton />
            </SidebarFooter>
        </Sidebar>
    );
}
