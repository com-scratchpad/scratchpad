import * as React from "react";

import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import SignOutButton from "./signout";
import { NavDocuments } from "./nav-documents";
import { File } from "lucide-react";
import { useState } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [pages, _] = useState([]);
    const documents = [
        {
            name: "Documents",
            emoji: <File className="mr-2 h-4 w-4"/>,
            pages: pages,
        }
    ];

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <NavDocuments documents={documents}/>
            </SidebarHeader>
            <SidebarRail />
            <SidebarFooter>
                <SignOutButton />
            </SidebarFooter>
        </Sidebar>
    );
}
