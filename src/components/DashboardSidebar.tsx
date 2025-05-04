
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  LayoutDashboard, 
  LogIn, 
  Settings, 
  User 
} from "lucide-react";

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/dashboard/settings",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      path: "/dashboard/profile",
    },
  ];

  return (
    <Sidebar
      className={`h-screen border-r transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[240px]"
      }`}
    >
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          {!collapsed && (
            <span className="text-lg font-semibold">App Dashboard</span>
          )}
        </div>
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
      </SidebarHeader>
      
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-1 p-2">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
                   ${isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 
                   'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`
                }
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-2">
        <div className="flex items-center justify-between p-2">
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                {user?.email}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
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
