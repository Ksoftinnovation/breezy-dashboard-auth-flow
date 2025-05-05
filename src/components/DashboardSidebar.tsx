
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ArrowLeft, 
  ArrowRight, 
  LayoutDashboard, 
  LogIn, 
  Settings, 
  User,
  UserCog,
  Users,
  FileText,
  Inbox
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Common navigation items
  const navigationItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Documentation",
      path: "/dashboard/documentation",
    },
    {
      icon: <Inbox className="h-5 w-5" />,
      label: "Inbox",
      path: "/dashboard/inbox",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  const projects = [
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Design Engineering",
      path: "/dashboard/design",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Sales & Marketing",
      path: "/dashboard/sales",
    }
  ];

  // Role-specific navigation items
  const adminNavItems = [
    {
      icon: <UserCog className="h-5 w-5" />,
      label: "Admin Dashboard",
      path: "/dashboard/admin",
    }
  ];

  const employeeNavItems = [
    {
      icon: <Users className="h-5 w-5" />,
      label: "Employee Dashboard",
      path: "/dashboard/employee",
    }
  ];

  // Determine which role-specific items to show
  const roleSpecificItems = user?.role === "admin" ? adminNavItems : employeeNavItems;

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "icon"}
      className={`transition-width duration-300 border-r ${
        collapsed && !isMobile ? "w-[70px]" : "w-[280px]"
      }`}
    >
      <SidebarHeader className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Company" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold">Acme Inc</span>
              <span className="text-xs text-muted-foreground">Enterprise</span>
            </div>
          )}
        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            {collapsed ? (
              <ArrowRight className="h-4 w-4" />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.path}
                    asChild
                    tooltip={collapsed ? item.label : undefined}
                  >
                    <NavLink to={item.path}>
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.path}
                    asChild
                    tooltip={collapsed ? item.label : undefined}
                  >
                    <NavLink to={item.path}>
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          
          {/* Only show role-specific items if they exist */}
          {roleSpecificItems.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel>{user?.role === "admin" ? "Admin" : "Employee"}</SidebarGroupLabel>
              <SidebarMenu>
                {roleSpecificItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={location.pathname === item.path}
                      asChild
                      tooltip={collapsed ? item.label : undefined}
                    >
                      <NavLink to={item.path}>
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )}
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-2">
        <div className="flex items-center justify-between p-2">
          {!collapsed && !isMobile && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/lovable-uploads/7c7365d6-3dc1-4788-93b8-907065d95d97.png" alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name || "shadcn"}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {user?.email || "m@example.com"}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={logout}
              title="Logout"
            >
              <LogIn className="h-4 w-4 rotate-180" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
