import { NavLink, useNavigate } from "react-router";
import type { ReactNode } from "react";
import nexoraLogo from "../../assets/nexora-logo.png";
import { clearAuthData } from "../../utils/session-storage";

type IconName =
  | "dashboard"
  | "workspaces"
  | "tasks"
  | "chat"
  | "notifications"
  | "profile"
  | "settings"
  | "documentation"
  | "logout";

const icons: Record<IconName, ReactNode> = {
  dashboard: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-7h6v7" />
    </>
  ),

  workspaces: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </>
  ),

  tasks: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="m7 12 3 3 7-7" />
    </>
  ),

  chat: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
    </>
  ),

  notifications: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),

  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),

  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1 1.4 1.1-1.5 2.6-1.7-.7a8 8 0 0 1-1.5.9l-.3 1.8h-3l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.7-1.5-2.6 1.4-1.1a8 8 0 0 1 0-1.8l-1.4-1.1 1.5-2.6 1.7.7a8 8 0 0 1 1.5-.9l.3-1.8h3l.3 1.8a8 8 0 0 1 1.5.9l1.7-.7 1.5 2.6-1.4 1.1a8 8 0 0 1 0 1.7Z" />
    </>
  ),

  documentation: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
      <path d="M8 7h8M8 10h8" />
    </>
  ),

  logout: (
    <>
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
    </>
  ),
};

function SidebarIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[21px] w-[21px] shrink-0"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

const mainNavigation = [
  { label: "Dashboard", path: "/dashboard", icon: "dashboard" as const },
  { label: "Workspaces", path: "/workspaces", icon: "workspaces" as const },
  { label: "My Tasks", path: "/tasks", icon: "tasks" as const },
  { label: "Chat", path: "/chat", icon: "chat" as const },
  {
    label: "Notifications",
    path: "/notifications",
    icon: "notifications" as const,
  },
];

const secondaryNavigation = [
  { label: "Profile", path: "/profile", icon: "profile" as const },
  { label: "Settings", path: "/settings", icon: "settings" as const },
  {
    label: "Documentation",
    path: "/documentation",
    icon: "documentation" as const,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="relative hidden h-screen w-[268px] shrink-0 flex-col overflow-hidden bg-[#073D49] text-white md:flex">
      {/* Sidebar Background Waves */}
      <svg
        viewBox="0 0 268 900"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sidebarBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#073D49" />
            <stop offset="55%" stopColor="#0B515C" />
            <stop offset="100%" stopColor="#0E7778" />
          </linearGradient>

          <linearGradient id="sidebarTealWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0B515C" />
            <stop offset="100%" stopColor="#29AAA5" />
          </linearGradient>
        </defs>

        <rect width="268" height="900" fill="url(#sidebarBg)" />

        <path
          d="M0 710 C55 665 105 672 155 695 C205 720 238 695 268 674 V900 H0 Z"
          fill="#073D49"
          opacity=".8"
        />

        <path
          d="M0 770 C60 720 112 728 160 752 C210 777 240 745 268 725 V900 H0 Z"
          fill="#17636B"
        />

        <path
          d="M0 820 C65 768 120 777 170 800 C218 821 243 795 268 778 V900 H0 Z"
          fill="url(#sidebarTealWave)"
        />

        <path d="M145 900 C190 858 225 813 268 785 V900 Z" fill="#E6A23A" />
      </svg>

      {/* Sidebar Content */}
      <div className="relative z-10 flex h-full flex-col px-5 py-7">
        {/* Logo */}
        <div className="mb-12 flex items-center gap-3 px-2">
          <img
            src={nexoraLogo}
            alt="NEXORA"
            className="h-auto w-44 object-contain"
          />
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-2">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#23877F] text-white shadow-md"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <SidebarIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-5 border-t border-white/20" />

        {/* Secondary Navigation */}
        <nav className="flex flex-col gap-2">
          {secondaryNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#23877F] text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <SidebarIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto border-t border-white/20 pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-[14px] font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            <SidebarIcon name="logout" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
