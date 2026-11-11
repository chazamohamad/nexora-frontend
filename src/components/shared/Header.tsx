import { useState } from "react";
import { getAuthData } from "../../utils/session-storage";

type ActivePanel = "notifications" | "profile" | null;

type HeaderProps = {
  onMenuClick: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const authData = getAuthData();

  const metadataName = authData?.user.user_metadata?.full_name;

  const userName =
    typeof metadataName === "string" && metadataName.trim()
      ? metadataName
      : (authData?.email?.split("@")[0] ?? "NEXORA Member");

  const userEmail = authData?.email ?? "";

  const avatarInitials = userName
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Toggle Header Panels
  const togglePanel = (panel: ActivePanel) => {
    setIsMobileSearchOpen(false);

    setActivePanel((current) => (current === panel ? null : panel));
  };

  // Toggle Mobile Search
  const toggleMobileSearch = () => {
    setActivePanel(null);
    setIsMobileSearchOpen((current) => !current);
  };

  return (
    <header className="sticky top-0 z-30 flex h-[68px] shrink-0 items-center justify-between gap-3 border-b border-[#DCE7E8] bg-surface/95 px-3 backdrop-blur-md sm:px-5 lg:px-8">
      {/* Mobile Menu + Brand */}
      <div className="flex min-w-0 items-center gap-3 md:hidden">
        <button
          type="button"
          onClick={() => {
            setActivePanel(null);
            setIsMobileSearchOpen(false);
            onMenuClick();
          }}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary transition hover:bg-soft-mint"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <span className="truncate text-lg font-bold text-primary">
          NEXOR<span className="text-accent">A</span>
        </span>
      </div>

      {/* Desktop Search */}
      <div className="hidden h-[42px] w-full max-w-[650px] flex-1 items-center gap-3 rounded-full border border-[#D2DFE1] bg-white px-4 shadow-sm transition focus-within:border-primary-action focus-within:ring-2 focus-within:ring-primary/10 md:flex">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 shrink-0 text-text-secondary"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </svg>

        <input
          type="search"
          placeholder="Search workspaces, tasks, or people..."
          aria-label="Search workspaces, tasks, or people"
          className="w-full bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-secondary"
        />
      </div>

      {/* Header Actions */}
      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Mobile Search Button */}
        <button
          type="button"
          onClick={toggleMobileSearch}
          aria-label="Search"
          aria-expanded={isMobileSearchOpen}
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition md:hidden ${
            isMobileSearchOpen
              ? "bg-soft-mint text-primary"
              : "text-text-secondary hover:bg-soft-mint hover:text-primary"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[22px] w-[22px]"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => togglePanel("notifications")}
            aria-label="Notifications"
            aria-expanded={activePanel === "notifications"}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition ${
              activePanel === "notifications"
                ? "bg-soft-mint text-primary"
                : "bg-soft-mint/70 text-primary hover:bg-soft-mint"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-[22px] w-[22px]"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>

            <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-surface bg-accent" />
          </button>

          {/* Notifications Dropdown */}
          {activePanel === "notifications" && (
            <div className="absolute right-0 top-full mt-3 w-[300px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <h3 className="text-sm font-semibold text-text-primary">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  aria-label="Close notifications"
                  className="text-xl text-text-muted hover:text-primary"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col items-center justify-center px-5 py-10">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-soft-mint">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-7 w-7 text-primary"
                  >
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                    <path d="M10 21h4" />
                  </svg>
                </div>

                <p className="text-sm font-semibold text-text-primary">
                  You're all caught up!
                </p>

                <p className="mt-1 text-center text-xs text-text-secondary">
                  No new notifications right now.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden h-9 w-px bg-[#DCE7E8] sm:block" />

        {/* User Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => togglePanel("profile")}
            aria-label="User profile"
            aria-expanded={activePanel === "profile"}
            className="flex items-center gap-2 rounded-xl transition hover:bg-soft-mint/60 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white ring-2 ring-soft-mint">
              {avatarInitials}
            </div>

            <div className="hidden max-w-[150px] text-left lg:block">
              <p className="truncate text-[13px] font-semibold text-text-primary">
                {userName}
              </p>

              <p className="mt-0.5 text-[11px] text-text-muted">Account</p>
            </div>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={`hidden h-4 w-4 text-text-secondary transition-transform sm:block ${
                activePanel === "profile" ? "rotate-180" : ""
              }`}
            >
              <path d="m7 10 5 5 5-5" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {activePanel === "profile" && (
            <div className="absolute right-0 top-full mt-3 w-[280px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
              <div className="border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {avatarInitials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">
                      {userName}
                    </p>

                    <p className="mt-1 truncate text-xs text-text-secondary">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Account
                </p>

                <p className="mt-2 text-sm text-text-primary">
                  Welcome to NEXORA
                </p>

                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  Your profile and account settings will be available here soon.
                </p>
              </div>

              <div className="border-t border-border p-3">
                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  className="w-full rounded-lg bg-background px-3 py-2 text-xs font-medium text-text-secondary transition hover:bg-soft-mint hover:text-primary"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div className="absolute left-3 right-3 top-full z-40 mt-2 md:hidden">
          <div className="flex h-[46px] items-center gap-3 rounded-xl border border-border bg-surface px-4 shadow-lg focus-within:border-primary-action focus-within:ring-2 focus-within:ring-primary/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 shrink-0 text-text-secondary"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="search"
              autoFocus
              placeholder="Search workspaces, tasks, or people..."
              aria-label="Search workspaces, tasks, or people"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            />

            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              aria-label="Close search"
              className="shrink-0 text-lg text-text-muted hover:text-primary"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
