import { useState } from "react";
import { Outlet } from "react-router";

import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Responsive Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      {/* Main Application */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Responsive Header */}
        <Header onMenuClick={openMobileSidebar} />

        {/* Page Content */}
        <main className="min-h-0 flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
