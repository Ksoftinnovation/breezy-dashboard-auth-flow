
import { Outlet, useLocation, Link } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function DashboardLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Generate breadcrumbs based on current location
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    
    // Map paths to breadcrumb items
    return paths.map((path, index) => {
      // Create the path up to this point
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const isLast = index === paths.length - 1;
      
      let title = path.charAt(0).toUpperCase() + path.slice(1);
      
      return (
        <BreadcrumbItem key={href}>
          {isLast ? (
            <BreadcrumbPage>{title}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink as={Link} to={href}>
              {title}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      );
    });
  };
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {isMobile ? (
          <>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px]">
                <DashboardSidebar />
              </SheetContent>
            </Sheet>
            <main className="flex-1 overflow-y-auto bg-background pt-16">
              <div className="border-b p-4 pl-16">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink as={Link} to="/dashboard">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    {generateBreadcrumbs().length > 0 ? (
                      generateBreadcrumbs()
                    ) : (
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="p-6">
                <Outlet />
              </div>
            </main>
          </>
        ) : (
          <>
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto bg-background">
              <div className="border-b p-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink as={Link} to="/dashboard">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    {generateBreadcrumbs().length > 0 ? (
                      generateBreadcrumbs()
                    ) : (
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="p-6">
                <Outlet />
              </div>
            </main>
          </>
        )}
      </div>
    </SidebarProvider>
  );
}
