import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

import AppLayout from "./components/shared/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

type ComingSoonPageProps = {
  title: string;
};

function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <div className="px-6 py-8 lg:px-8">
      <h1 className="text-2xl font-bold text-text-primary">{title}</h1>

      <p className="mt-2 text-sm text-text-secondary">
        This section will be developed soon.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />

            <Route path="dashboard" element={<DashboardPage />} />

            <Route
              path="workspaces"
              element={<ComingSoonPage title="Workspaces" />}
            />

            <Route path="tasks" element={<ComingSoonPage title="My Tasks" />} />

            <Route path="chat" element={<ComingSoonPage title="Chat" />} />

            <Route
              path="notifications"
              element={<ComingSoonPage title="Notifications" />}
            />

            <Route
              path="profile"
              element={<ComingSoonPage title="Profile" />}
            />

            <Route
              path="settings"
              element={<ComingSoonPage title="Settings" />}
            />

            <Route
              path="documentation"
              element={<ComingSoonPage title="Documentation" />}
            />
          </Route>
        </Route>

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
