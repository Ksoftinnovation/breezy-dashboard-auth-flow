
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
    
    // Map paths to breadcrumb items with separators
    return paths.map((path, index) => {
      // Create the path up to this point
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const isLast = index === paths.length - 1;
      
      let title = path.charAt(0).toUpperCase() + path.slice(1);
      
      // Return BreadcrumbItem with separator
      return (
        <React.Fragment key={href}>
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage>{title}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={href}>{title}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  };
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {isMobile ? (
          <>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px] max-w-[80vw]">
                <DashboardSidebar />
              </SheetContent>
            </Sheet>
            <main className="flex-1 overflow-y-auto bg-background pt-16">
              <div className="border-b p-4 pl-16">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {generateBreadcrumbs().length > 0 ? (
                      generateBreadcrumbs()
                    ) : (
                      <BreadcrumbPage>Home</BreadcrumbPage>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="p-4 md:p-6">
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
                      <BreadcrumbLink asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {generateBreadcrumbs().length > 0 ? (
                      generateBreadcrumbs()
                    ) : (
                      <BreadcrumbPage>Home</BreadcrumbPage>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="p-4 md:p-6">
                <Outlet />
              </div>
            </main>
          </>
        )}
      </div>
    </SidebarProvider>
  );
}
