import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutate } from "@/hooks/UseMutate";
import useAuthToken from "@/hooks/use-auth-token";
import { Icon } from "@iconify/react";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import { syncUserData } from "@/lib/user-utils";

const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^\+?[0-9]{9,15}$/.test(val),
      {
        message: "Must be a valid email or phone number",
      }
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginForm() {
  const [show, setShow] = useState(false);
  const { setToken } = useAuthToken();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "post",
    endpoint: "login-api",
    text: "Logged in successfully!",
    onSuccess: (data) => {
      navigate("/");
      setToken(data.token);
      // Use the new sync function to update user data
      syncUserData(data.data);
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter email or phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type={`${show ? "text " : "password"}`}
                    {...field}
                  />
                </FormControl>
                {show ? (
                  <Button
                    size="icon"
                    variant="ghost"
                    className=" h-7 w-7 absolute right-1 top-8"
                    color="primary"
                    title="Show"
                    type="button"
                    onClick={() => setShow(!show)}
                  >
                    <Icon icon="heroicons:eye-slash" className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    className=" h-7 w-7 absolute right-1 top-8"
                    color="primary"
                    title="Show"
                    type="button"
                    onClick={() => setShow(!show)}
                  >
                    <Icon icon="heroicons:eye" className="h-4 w-4" />
                  </Button>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end items-center">
            <Link
              to="/reset-password"
              className="text-sm text-main hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-center mb-3">
            <Button
              type="submit"
              className="w-full bg-main hover:bg-main-dark"
              disabled={isPending}
            >
              {isPending ? (
                <BtnLoading size="6" text="Logging in..." />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
