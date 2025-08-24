import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import AuthImageSide from "@/components/AuthImageSide/AuthImageSide";
import logo from "../../assets/logo.png";
import login from "../../assets/login.png";
import { useMutate } from "@/hooks/UseMutate";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import ResendCode from "@/components/ResendCode/ResendCode";
import Cookies from "js-cookie";

const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Code must be numeric"),
});

function EmailVerification() {
  const email = localStorage.getItem("to-verify-email") || "test@test.com";
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const user = JSON.parse(localStorage.getItem("yall_user_data")) && Cookies.get("yall_auth_token");

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "POST",
    endpoint: "verify-email",
    text: "Email verified successfully!",
    onSuccess: () => {
      if (user) {
        // navigate("/");
        return;
      } else {
        navigate("/login");
      }
      localStorage.removeItem("to-verify-email");
    },
  });

  const { mutate: resendMutate } = useMutate({
    method: "POST",
    endpoint: "resend-otp",
    text: "Verification code resent successfully!",
  });

  const onSubmit = (data) => {
    mutate({ otp: data.code, email: email });
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendMutate({ email });
    } catch (error) {
      console.error("Resend failed:", error);
    } finally {
      setIsResending(false);
    }
  };

  const codeValue = watch("code");

  return (
    <div className="cover flex flex-col-reverse md:flex-row justify-between items-center h-screen overflow">
      <div className="left flex-1 w-full h-full flex justify-between items-center">
        <div className="flex flex-col w-[90%] xl:w-[70%] mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 rounded-2xl shadow-xl bg-second">
          <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
            <img src={logo} alt="Logo" />
          </div>
          <div className="text-md text-[#6B7280] pb-8 mx-auto">
            Verification of your email
          </div>

          <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 text-center flex flex-col items-center">
              <Label htmlFor="code">Verification Code</Label>
              <InputOTP
                maxLength={6}
                value={codeValue}
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(value) => setValue("code", value)}
              />
              {errors.code && (
                <p className="text-sm text-red-500">{errors.code.message}</p>
              )}
              <ResendCode
                onResend={handleResend}
                isResending={isResending}
                email={email}
                className="mt-4"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-[#5685CE] hover:bg-[#4a75b7] text-white"
              >
                {isPending ? <BtnLoading text="Verifying..." /> : "Verify Code"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AuthImageSide image={login} />
    </div>
  );
}

export default EmailVerification;
