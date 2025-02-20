import "./App.css";
import Tiptap from "@/components/tiptap/Tiptap";
import { CommandDialogDemo } from "@/components/command/command";
import { AppSidebar } from "@/components/sidebar/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MoreVertical, Settings } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function UserSettings() {
    const [isOpen, setIsOpen] = useState(false);

    return <div className="p-6">
            <h1 className="text-xl font-bold mb-2">My Profile</h1>
            <hr className="border-t border-gray-400 mb-4" /> 
        <Avatar>
    
  <AvatarImage src="/jeffbezos.jpg" />
  <AvatarFallback>User</AvatarFallback>
</Avatar>
        <Input type="Name" placeholder= "Name" />
        Account
        Email: jeffbezos@gmail.com
        <Button variant="default">Change</Button>
        Password
        <Button variant="default">Change</Button>
        Themes
        <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Light" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
        
</Select>

    </div>
}

export default UserSettings;