import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import SignOutButton from "./signout";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <NavMain items={[]} />
            </SidebarHeader>
            <SidebarRail />
            <SidebarFooter>
                <SignOutButton />
            </SidebarFooter>
        </Sidebar>
    );
}
