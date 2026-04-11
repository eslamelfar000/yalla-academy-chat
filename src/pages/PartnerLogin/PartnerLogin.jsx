import React, { useEffect, useState } from "react";
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
  const { setToken, setPartnerUser, getToken } = usePartnerAuthToken();
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
      navigate("/academy-chat");
    },
  });

  const onSubmit = (values) => mutate(values);

  useEffect(() => {
    if (getToken()) {
      navigate("/academy-chat");
    }
  }, [getToken, navigate]);

  return (
    <>
      <div
        className="flex flex-col-reverse md:flex-row min-h-screen overflow-hidden"
        style={{ background: "#f5f6f9" }}
      >
        {/* ══ LEFT: Form ══════════════════════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-10 bg-white">
          <div className="w-full max-w-[420px]">
            {/* Logo */}
            {/* <div className="pl-logo-row ">
              <img src={logo} alt="Yalla System" className="" />
            </div> */}

            <div className="icon text-center flex justify-center text-main">
              <Icon icon="mdi:shield-key-outline" className="size-20" />
            </div>

            <h1
              className="text-2xl font-extrabold text-center mb-1 tracking-tight"
              style={{
                color: "#1e293b",
                fontSize: "1.55rem",
                letterSpacing: "-0.02em",
              }}
            >
              Login to Chat
            </h1>
            <p
              className="text-center mb-8"
              style={{ color: "#64748b", fontSize: "0.85rem" }}
            >
              Enter your access code provided by the admin
            </p>

            {/* ── Form ── */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Admin Code */}
                <div className="mb-[1.1rem]">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Code</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none z-10"
                              style={{ color: "#94a3b8", left: "0.85rem" }}
                            >
                              <Icon icon="mdi:shield-key-outline" />
                            </span>
                            <Input
                              type={showCode ? "text" : "password"}
                              placeholder="Enter your access code"
                              className="pl-[2.4rem] h-12"
                              style={{ paddingRight: "2.5rem" }}
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer flex items-center rounded-md transition-colors"
                              style={{
                                right: "0.5rem",
                                padding: "0.3rem",
                                color: "#94a3b8",
                              }}
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
                <div
                  className="flex items-start gap-2 rounded-xl mt-3 leading-6"
                  style={{
                    background: "#eef3fb",
                    border: "1px solid #b8d0ef",
                    padding: "0.65rem 0.85rem",
                    fontSize: "0.78rem",
                    color: "#3c629d",
                  }}
                >
                  <Icon
                    icon="mdi:information-outline"
                    className="flex-shrink-0 mt-0.5 text-base"
                  />
                  <span>
                    Your access code was provided by the System admin team.
                    Contact your administrator if you haven't received one.
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full border-0 cursor-pointer transition-all mt-2 flex items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #5685ce 0%, #3c629d 100%)",
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    padding: "0.8rem",
                    borderRadius: "12px",
                    boxShadow: "0 4px 18px rgba(86,133,206,0.35)",
                  }}
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
        <div
          className="flex-1 relative flex flex-col items-center justify-center overflow-hidden p-12 md:p-4 max-h-[250px] md:max-h-screen"
          style={{
            background:
              "linear-gradient(145deg, #1e3a5f 0%, #335FA2 50%, #5685ce 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute rounded-full blur-[60px] opacity-35 pointer-events-none"
            style={{
              width: "320px",
              height: "320px",
              background: "#5685ce",
              top: "-80px",
              right: "-80px",
            }}
          />
          <div
            className="absolute rounded-full blur-[60px] opacity-35 pointer-events-none"
            style={{
              width: "260px",
              height: "260px",
              background: "#3c629d",
              bottom: "-60px",
              left: "-60px",
            }}
          />
          <div
            className="absolute rounded-full blur-[60px] opacity-25 pointer-events-none"
            style={{
              width: "180px",
              height: "180px",
              background: "#87b4e8",
              top: "40%",
              left: "5%",
            }}
          />

          {/* Hero image */}
          {isLoading ? (
            <TfiReload className="!size-20 text-white animate-spin" />
          ) : (
            <img
              src={chatData?.chat_login_image}
              alt="Partner Portal"
              className="w-full object-contain relative z-20 drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] h-[250px] md:h-full"
            />
          )}
        </div>
      </div>
    </>
  );
}
