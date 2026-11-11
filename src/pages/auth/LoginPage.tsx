import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import nexoraLogo from "../../assets/nexora-logo.png";
import nexoraLogo1 from "../../assets/nexora-logo1.png";

import { login } from "../../services/auth.service";
import { saveAuthData } from "../../utils/session-storage";

import type { LoginCredentials, StoredAuthData } from "../../models/auth.model";

function LoginPage() {
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Feedback States
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [notice, setNotice] = useState("");

  const navigate = useNavigate();

  // Clear Feedback Messages
  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setNotice("");
  };

  // Handle Login
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearMessages();

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare Credentials
      const credentials: LoginCredentials = {
        email: email.trim(),
        password,
      };

      // Call Backend API
      const result = await login(credentials);

      // Validate Response
      if (!result.success || !result.data?.user || !result.data?.session) {
        throw new Error("Invalid login response.");
      }

      // Prepare Stored Authentication Data
      const storedData: StoredAuthData = {
        user: result.data.user,
        email: result.data.user.email ?? credentials.email,
        session: result.data.session,
      };

      // Save User and Session
      saveAuthData(storedData);

      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      console.error("Login Error:", error);

      if (axios.isAxiosError<{ message?: string }>(error)) {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
          setErrorMessage("Invalid email or password.");
        } else if (status === 429) {
          setErrorMessage("Too many login attempts. Please try again later.");
        } else if (!error.response) {
          setErrorMessage("Cannot connect to the server. Please try again.");
        } else {
          setErrorMessage(serverMessage ?? "Login failed. Please try again.");
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-[49%_51%]">
      {/* =====================================
          LEFT SIDE - BRANDING & WAVES
      ====================================== */}

      <section className="relative hidden min-h-screen overflow-hidden lg:flex">
        {/* Sidebar Background */}
        <svg
          viewBox="0 0 480 700"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="nexoraSidebarBase"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#073D49" />
              <stop offset="55%" stopColor="#0B515C" />
              <stop offset="100%" stopColor="#0E7778" />
            </linearGradient>

            <linearGradient
              id="nexoraWaveOne"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#17636B" />
              <stop offset="100%" stopColor="#23877F" />
            </linearGradient>

            <linearGradient
              id="nexoraWaveTwo"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#0B515C" />
              <stop offset="55%" stopColor="#23877F" />
              <stop offset="100%" stopColor="#29AAA5" />
            </linearGradient>
          </defs>

          {/* Main Background */}
          <rect width="480" height="700" fill="url(#nexoraSidebarBase)" />

          {/* Upper Dark Curved Shape */}
          <path
            d="
              M480 0
              H345
              C402 60 400 123 371 178
              C340 235 354 282 403 321
              C438 348 463 364 480 383
              V0 Z
            "
            fill="#073D49"
            opacity="0.48"
          />

          {/* First Bottom Wave */}
          <path
            d="
              M0 486
              C65 443 119 440 171 456
              C230 474 274 462 328 436
              C386 408 433 390 480 389
              V700 H0 Z
            "
            fill="#073D49"
            opacity="0.65"
          />

          {/* Second Bottom Wave */}
          <path
            d="
              M0 548
              C73 500 124 503 185 521
              C245 539 293 518 345 485
              C397 454 441 438 480 428
              V700 H0 Z
            "
            fill="url(#nexoraWaveOne)"
            opacity="0.95"
          />

          {/* Third Turquoise Wave */}
          <path
            d="
              M0 601
              C71 556 131 561 195 577
              C258 594 311 571 366 536
              C413 506 449 491 480 478
              V700 H0 Z
            "
            fill="url(#nexoraWaveTwo)"
            opacity="0.85"
          />

          {/* Orange Accent Wave */}
          <path
            d="
              M255 700
              C306 664 347 620 388 580
              C421 548 450 520 480 501
              V700 Z
            "
            fill="#e6a13a"
          />
        </svg>

        {/* Sidebar Content */}
        <div className="relative z-10 flex min-h-screen w-full flex-col px-10 py-9 xl:px-12">
          {/* Logo */}
          <div>
            <img
              src={nexoraLogo}
              alt="NEXORA Logo"
              className="h-auto w-44 object-contain object-left"
            />
          </div>

          {/* Main Branding Content */}
          <div className="mt-24 max-w-[430px]">
            <h1 className="text-[30px] font-bold leading-[1.2] tracking-tight text-white xl:text-[32px]">
              Plan, track and ship work together.
            </h1>

            <div className="mt-8 space-y-5">
              {/* Feature 1 */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/15 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path d="M5 12.5 10 17l9-10" />
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                  </svg>
                </div>

                <p className="text-[14px] text-white/95 xl:text-[15px]">
                  Keep your team aligned on every workflow
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/15 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                </div>

                <p className="text-[14px] text-white/95 xl:text-[15px]">
                  Collaborate in real time
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/15 text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path d="m13 2-3 9h7l-6 11 2-9H6l7-11Z" />
                  </svg>
                </div>

                <p className="text-[14px] text-white/95 xl:text-[15px]">
                  Move work forward from idea to done
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-12">
            <p className="text-xs text-white/80">© 2026 NEXORA</p>
          </div>
        </div>
      </section>

      {/* =====================================
          RIGHT SIDE - LOGIN
      ====================================== */}

      <section className="flex min-h-screen items-center justify-center bg-background px-6 py-12 sm:px-10">
        <div className="w-full max-w-[318px]">
          {/* Mobile Logo */}
          <div className="mb-12 flex justify-center lg:hidden">
            <img
              src={nexoraLogo1}
              alt="NEXORA Logo"
              className="h-auto w-52 object-contain"
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[30px] font-bold leading-tight tracking-tight text-text-primary">
              Welcome back
            </h2>

            <p className="mt-1.5 text-[14px] text-text-secondary">
              Sign in to your NEXORA account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[13px] font-medium text-text-primary"
              >
                Email
              </label>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-text-muted"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearMessages();
                  }}
                  required
                  disabled={isLoading}
                  className="h-[40px] w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-[13px] text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary-action focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[13px] font-medium text-text-primary"
              >
                Password
              </label>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-text-muted"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  <path d="M12 14v3" />
                </svg>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearMessages();
                  }}
                  required
                  disabled={isLoading}
                  className="h-[40px] w-full rounded-xl border border-border bg-surface pl-10 pr-11 text-[13px] text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary-action focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-primary"
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-[18px] w-[18px]"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 9 5 10 7-.4.8-1.4 2-2.8 3.2" />
                      <path d="M6.2 6.2C3.9 7.7 2.5 10 2 12c1 2 5 7 10 7 1.2 0 2.3-.3 3.3-.7" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-[18px] w-[18px]"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  disabled={isLoading}
                  className="h-[17px] w-[17px] cursor-pointer accent-primary-action"
                />

                <span className="text-[12px] text-text-primary">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setNotice("Password recovery will be available soon.");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="text-[12px] font-medium text-primary-action underline underline-offset-2 transition hover:text-secondary"
              >
                Forgot password?
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-lg border border-error/20 bg-error-bg px-3 py-2.5 text-xs text-error"
              >
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                role="status"
                className="rounded-lg border border-success/20 bg-success-bg px-3 py-2.5 text-xs text-success"
              >
                {successMessage}
              </div>
            )}

            {/* General Notice */}
            {notice && (
              <div
                role="status"
                className="rounded-lg border border-info/20 bg-info-bg px-3 py-2.5 text-xs text-info"
              >
                {notice}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-[41px] w-full items-center justify-center gap-2 rounded-xl bg-button-primary text-[14px] font-semibold text-white shadow-sm transition hover:bg-button-hover focus:outline-none focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
