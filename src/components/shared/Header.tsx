import { useState } from "react";
import { getAuthData } from "../../utils/session-storage";

type ActivePanel = "notifications" | "profile" | null;

function Header() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

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
    setActivePanel((current) => (current === panel ? null : panel));
  };

  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-[#DCE7E8] bg-surface/95 px-6 backdrop-blur-md lg:px-9">
      {/* Search */}
      <div className="flex h-[42px] w-full max-w-[650px] items-center gap-3 rounded-full border border-[#D2DFE1] bg-white px-4 shadow-sm transition focus-within:border-primary-action focus-within:ring-2 focus-within:ring-primary/10">
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
      <div className="ml-6 flex shrink-0 items-center gap-5">
        {/* =================================
            NOTIFICATIONS
        ================================== */}

        <div className="relative">
          <button
            type="button"
            onClick={() => togglePanel("notifications")}
            aria-label="Notifications"
            aria-expanded={activePanel === "notifications"}
            className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
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
              className="h-[23px] w-[23px]"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>

            {/* Notification Indicator */}
            <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-surface bg-accent" />
          </button>

          {/* Notifications Dropdown */}
          {activePanel === "notifications" && (
            <div className="absolute right-0 top-full mt-3 w-[320px] overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <h3 className="text-sm font-semibold text-text-primary">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  aria-label="Close notifications"
                  className="text-xl leading-none text-text-muted transition hover:text-primary"
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

                <p className="mt-1 text-xs text-text-secondary">
                  No new notifications right now.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-9 w-px bg-[#DCE7E8]" />

        {/* =================================
            USER PROFILE
        ================================== */}

        <div className="relative">
          <button
            type="button"
            onClick={() => togglePanel("profile")}
            aria-label="User profile"
            aria-expanded={activePanel === "profile"}
            className="flex items-center gap-3 rounded-xl transition hover:bg-soft-mint/60"
          >
            {/* Avatar */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white ring-2 ring-soft-mint">
              {avatarInitials}
            </div>

            {/* User Name */}
            <div className="hidden max-w-[150px] text-left sm:block">
              <p className="truncate text-[13px] font-semibold text-text-primary">
                {userName}
              </p>

              <p className="mt-0.5 text-[11px] text-text-muted">Account</p>
            </div>

            {/* Dropdown Arrow */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={`h-4 w-4 text-text-secondary transition-transform ${
                activePanel === "profile" ? "rotate-180" : ""
              }`}
            >
              <path d="m7 10 5 5 5-5" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {activePanel === "profile" && (
            <div className="absolute right-0 top-full mt-3 w-[280px] overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
              {/* Profile Information */}
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

              {/* Account Details */}
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

              {/* Close Dropdown */}
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
    </header>
  );
}

export default Header;
