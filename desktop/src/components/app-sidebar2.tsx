import * as React from "react"
import { ChevronRight, File, Folder } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar"

const compactStyles = {
  menuItem: "!py-0 !my-0",
  menuButton: "!h-7 !py-0 !px-1 text-xs !my-0",
  menuBadge: "!h-3 !min-w-3 !text-[9px] !top-1 !right-1 !p-0",
  groupLabel: "!h-5 !py-0 !my-0 text-xs font-bold px-3",
  groupContent: "!text-xs !mt-0",
  sidebarGroup: "!p-1",
  menuSub: "!mx-2 !px-1 !py-0",
  sidebarMenu: "!gap-0.5 px-2",
  icon: "w-3 h-3"
};

const data = {
  tree: [
    [
      "app",
      [
        "api",
        ["hello", ["route.ts"]],
        "page.tsx",
        "layout.tsx",
        ["blog", ["page.tsx"]],
      ],
    ],
    [
      "components",
      ["ui", "button.tsx", "card.tsx"],
      "header.tsx",
      "footer.tsx",
    ],
    ["lib", ["util.ts"]],
    ["public", "favicon.ico", "vercel.svg"],
    ".eslintrc.json",
    ".gitignore",
    "next.config.js",
    "tailwind.config.js",
    "package.json",
    "README.md",
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="pt-10">
      <SidebarContent className="!gap-1">
        <SidebarGroup className={compactStyles.sidebarGroup}>
          <SidebarGroupLabel className={compactStyles.groupLabel}>Files</SidebarGroupLabel>
          <SidebarGroupContent className={compactStyles.groupContent}>
            <SidebarMenu className={compactStyles.sidebarMenu}>
              {data.tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

function Tree({ item }: { item: string | any[] }) {
  const [name, ...items] = Array.isArray(item) ? item : [item]
  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={name === "button.tsx"}
        className={`${compactStyles.menuButton} data-[active=true]:bg-transparent`}
      >
        <File className={compactStyles.icon} />
        {name}
      </SidebarMenuButton>
    )
  }
  return (
    <SidebarMenuItem className={compactStyles.menuItem}>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={name === "components" || name === "ui"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className={compactStyles.menuButton}>
            <ChevronRight className={`${compactStyles.icon} transition-transform`} />
            <Folder className={compactStyles.icon} />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className={compactStyles.menuSub}>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
