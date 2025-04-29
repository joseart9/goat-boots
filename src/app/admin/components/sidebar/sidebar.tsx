import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Package,
  Tag,
  Palette,
  ShoppingCart,
  Settings,
  LayoutDashboard,
} from "lucide-react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Configuración",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Productos",
          url: "/admin/productos",
          icon: Package,
        },
        {
          title: "Categorias",
          url: "/admin/categorias",
          icon: Tag,
        },
        {
          title: "Colores",
          url: "/admin/colores",
          icon: Palette,
        },
        {
          title: "Pedidos",
          url: "/admin/pedidos",
          icon: ShoppingCart,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props} className="border-r bg-white dark:bg-secondary-500">
      <SidebarHeader className="border-b px-6 pt-5 pb-4">
        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
      </SidebarHeader>
      <SidebarContent className="px-4 py-2">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            {item.items ? (
              <>
                <SidebarGroupLabel className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-muted-foreground"></SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => {
                      const isActive = pathname === subItem.url;
                      return (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            className={cn(
                              "flex items-center gap-2 px-2 py-2 text-sm",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              {subItem.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center gap-2 px-2 py-2 text-sm",
                    pathname === item.url
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
