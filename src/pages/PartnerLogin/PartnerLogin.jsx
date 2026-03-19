import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/UseMutate";
import usePartnerAuthToken from "@/hooks/usePartnerAuthToken";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import { Icon } from "@iconify/react";
import logo from "../../assets/logo.png";
import loginImg from "../../assets/login.png";
import { useSettings } from "@/context/SettingsContext";
import { TfiReload } from "react-icons/tfi";

// ─── Validation schema ────────────────────────────────────────────────────────
const partnerSchema = z.object({
  code: z
    .string()
    .min(1, "Access code is required")
    .min(4, "Access code must be at least 4 characters"),
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function PartnerLogin() {
  const navigate = useNavigate();
  const { setToken, setPartnerUser } = usePartnerAuthToken();
  const [showCode, setShowCode] = useState(false);

  const { chat: chatData, isLoading, error } = useSettings();

  const form = useForm({
    resolver: zodResolver(partnerSchema),
    defaultValues: { code: "" },
  });

  const { mutate, isPending } = useMutate({
    method: "post",
    endpoint: "dashboard/login-by-code",
    text: "Welcome! Logged in to Chat.",
    toast: true,
    onSuccess: (data) => {
      // Save token and user under PARTNER keys — never touches student keys
      setToken(data?.token);
      setPartnerUser(data?.data || data?.user);
      navigate("/partner-chat");
    },
  });

  const onSubmit = (values) => mutate(values);

  return (
    <>
      {/* ─── Scoped styles ────────────────────────────────────────────────── */}
      <style>{`
        /* ── Root ── */
        .pl-root {
          display: flex;
          flex-direction: column-reverse;
          min-height: 100vh;
          overflow: hidden;
          background: #f5f6f9;
        }
        @media (min-width: 768px) {
          .pl-root { flex-direction: row; }
        }

        /* ══════════════════════════════════════════════
           LEFT — Form Panel
        ══════════════════════════════════════════════ */
        .pl-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.25rem;
          background: #ffffff;
        }
        @media (min-width: 768px) {
          .pl-left { padding: 3rem 2.5rem; }
        }

        .pl-form-box {
          width: 100%;
          max-width: 420px;
        }

        /* Logo row */
        .pl-logo-row {
          display: flex;
          justify-content: center;
        }
        .pl-logo-row img { width: 250px; object-fit: contain; }

        /* Titles */
        .pl-heading {
          font-size: 1.55rem;
          font-weight: 800;
          color: #1e293b;
          text-align: center;
          margin-bottom: 0.35rem;
          letter-spacing: -0.02em;
        }
        .pl-sub {
          font-size: 0.85rem;
          color: #64748b;
          text-align: center;
          margin-bottom: 2rem;
        }

        /* Badge */
        .pl-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #5685ce;
          background: #eef3fb;
          border: 1px solid #b8d0ef;
          border-radius: 999px;
          padding: 0.25rem 0.7rem;
          margin-bottom: 1rem;
        }
        .pl-badge-row {
          display: flex;
          justify-content: center;
        }

        /* Input group label override */
        .pl-form-box .pl-field-block {
          margin-bottom: 1.1rem;
        }

        /* Input icon wrapper */
        .pl-input-wrap {
          position: relative;
        }
        .pl-input-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 1rem;
          pointer-events: none;
          z-index: 1;
        }
        .pl-input-with-icon {
          padding-left: 2.4rem !important;
        }

        /* Toggle code visibility */
        .pl-toggle-btn {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.3rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          border-radius: 6px;
          transition: color 0.2s;
        }
        .pl-toggle-btn:hover { color: #5685ce; }

        /* Submit button */
        .pl-submit {
          width: 100%;
          background: linear-gradient(135deg, #5685ce 0%, #3c629d 100%) !important;
          color: #fff !important;
          font-weight: 700 !important;
          font-size: 0.95rem !important;
          padding: 0.8rem !important;
          border-radius: 12px !important;
          border: none !important;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(86,133,206,0.35);
          transition: all 0.2s !important;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .pl-submit:hover:not(:disabled) {
          box-shadow: 0 6px 24px rgba(86,133,206,0.50);
          transform: translateY(-1px);
        }
        .pl-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        /* Divider */
        .pl-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
          color: #cbd5e1;
          font-size: 0.78rem;
        }
        .pl-divider::before, .pl-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        /* Footer link */
        .pl-footer-link {
          text-align: center;
          font-size: 0.82rem;
          color: #64748b;
          margin-top: 1.25rem;
        }
        .pl-footer-link a {
          color: #4f46e5;
          font-weight: 600;
          text-decoration: none;
        }
        .pl-footer-link a:hover { text-decoration: underline; }

        /* Code hint box */
        .pl-hint {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          background: #eef3fb;
          border: 1px solid #b8d0ef;
          border-radius: 10px;
          padding: 0.65rem 0.85rem;
          font-size: 0.78rem;
          color: #3c629d;
          margin-top: 0.75rem;
          line-height: 1.5;
        }
        .pl-hint-icon { flex-shrink: 0; margin-top: 1px; font-size: 1rem; }

        /* ══════════════════════════════════════════════
           RIGHT — Visual Panel
        ══════════════════════════════════════════════ */
        .pl-right {
          flex: 1;
          display: none;
          position: relative;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #1e3a5f 0%, #335FA2 50%, #5685ce 100%);
          overflow: hidden;
          padding: 3rem 2rem;
        }
        @media (min-width: 768px) {
          .pl-right { display: flex; }
        }

        /* Decorative blobs */
        .pl-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
          pointer-events: none;
        }
        .pl-blob-1 {
          width: 320px; height: 320px;
          background: #5685ce;
          top: -80px; right: -80px;
        }
        .pl-blob-2 {
          width: 260px; height: 260px;
          background: #3c629d;
          bottom: -60px; left: -60px;
        }
        .pl-blob-3 {
          width: 180px; height: 180px;
          background: #87b4e8;
          top: 40%; left: 5%;
          opacity: 0.25;
        }

        /* Back-to-home link */
        .pl-back {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          transition: background 0.2s;
        }
        .pl-back:hover { background: rgba(255,255,255,0.2); color: #fff; }

        /* Right panel hero image */
        .pl-hero-img {
          width: 100%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 24px 40px rgba(0,0,0,0.35));
          animation: pl-float 4s ease-in-out infinite alternate;
        }
        @keyframes pl-float {
          from { transform: translateY(0); }
          to   { transform: translateY(-14px); }
        }

        /* Right-panel text */
        .pl-right-title {
          position: relative;
          z-index: 2;
          font-size: 1.75rem;
          font-weight: 800;
          color: #fff;
          text-align: center;
          margin-top: 1.75rem;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }
        .pl-right-sub {
          position: relative;
          z-index: 2;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.72);
          text-align: center;
          margin-top: 0.5rem;
          max-width: 320px;
          line-height: 1.6;
        }

        /* Feature list */
        .pl-features {
          position: relative;
          z-index: 2;
          margin-top: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          width: 100%;
          max-width: 300px;
        }
        .pl-feature {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.88);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 0.6rem 0.85rem;
          backdrop-filter: blur(4px);
          transition: background 0.2s;
        }
        .pl-feature:hover { background: rgba(255,255,255,0.14); }
        .pl-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.15);
          font-size: 1rem;
          flex-shrink: 0;
          color: #fff;
        }
      `}</style>

      <div className="pl-root">
        {/* ══ LEFT: Form ══════════════════════════════════════════════════════ */}
        <div className="pl-left">
          <div className="pl-form-box">
            {/* Logo */}
            <div className="pl-logo-row ">
              <img src={logo} alt="Yalla System" className="" />
            </div>

            <h1 className="pl-heading">Login to Chat</h1>
            <p className="pl-sub">
              Enter your access code provided by the admin
            </p>

            {/* ── Form ── */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Admin Code */}
                <div className="pl-field-block">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Code</FormLabel>
                        <FormControl>
                          <div className="pl-input-wrap">
                            <span className="pl-input-icon">
                              <Icon icon="mdi:shield-key-outline" />
                            </span>
                            <Input
                              type={showCode ? "text" : "password"}
                              placeholder="Enter your access code"
                              className="pl-input-with-icon h-12"
                              style={{ paddingRight: "2.5rem" }}
                              {...field}
                            />
                            <button
                              type="button"
                              className="pl-toggle-btn"
                              onClick={() => setShowCode((s) => !s)}
                              tabIndex={-1}
                            >
                              <Icon
                                icon={
                                  showCode
                                    ? "heroicons:eye-slash"
                                    : "heroicons:eye"
                                }
                                style={{ fontSize: "1rem" }}
                              />
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Hint */}
                <div className="pl-hint">
                  <Icon
                    icon="mdi:information-outline"
                    className="pl-hint-icon"
                  />
                  <span>
                    Your access code was provided by the Yalla System admin
                    team. Contact your administrator if you haven't received
                    one.
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="pl-submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <BtnLoading size="6" text="Signing in…" />
                  ) : (
                    <>
                      <Icon icon="mdi:login" style={{ fontSize: "1.1rem" }} />
                      Sign In
                    </>
                  )}
                </button>
              </form>
            </Form>
          </div>
        </div>

        {/* ══ RIGHT: Visual panel ═════════════════════════════════════════════ */}
        <div className="pl-right">
          {/* Decorative blobs */}
          <div className="pl-blob pl-blob-1" />
          <div className="pl-blob pl-blob-2" />
          <div className="pl-blob pl-blob-3" />

          {/* Hero image */}
          {isLoading ? (
            <TfiReload className="!size-20 text-white animate-spin" />
          ) : (
            <img
              src={chatData?.chat_login_image}
              alt="Partner Portal"
              className="pl-hero-img"
            />
          )}
        </div>
      </div>
    </>
  );
}
