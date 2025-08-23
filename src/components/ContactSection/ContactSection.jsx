import { PhoneIcon } from "@heroicons/react/16/solid";
import React from "react";
import { BiPhoneCall, BiUser } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { MdMessage, MdOutlineMailOutline } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import ContactSectionSkeleton from "./ContactSectionSkeleton";
import { useMutate } from "../../hooks/UseMutate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function ContactSection() {
  const { contact: contactData, isLoading, error } = useSettings();

  const form = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Use custom useMutate hook
  const contactMutation = useMutate({
    method: "POST",
    endpoint: "/contact",
    queryKeysToInvalidate: [],
    text: "Message sent successfully!",
    onSuccess: () => {
      form.reset(); // Reset form after successful submission
    },
  });

  const onSubmit = async (data) => {
    // Create FormData
    const formData = new FormData();

    // Add form fields to FormData
    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);

    // Send using useMutate hook
    contactMutation.mutate(formData);
  };

  // Show loading skeleton while fetching data
  if (isLoading) {
    return <ContactSectionSkeleton />;
  }

  // Show error state if there's an error
  if (error) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Error Loading Contact Information
            </h2>
            <p className="text-gray-600">
              Failed to load contact details. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Extract contact data from settings
  const { phone = "470-601-1911", email = "Pagedone1234@gmail.com" } =
    contactData;

  return (
    <>
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10">
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1696488602.png"
                    alt="ContactUs tailwind section"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-main object-cover"
                  />
                  <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                    Contact us
                  </h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-6 block flex flex-col items-start">
                      <a
                        href={`tel:${phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center mb-6 hover:text-main transition-all duration-300"
                      >
                        <BiPhoneCall size={30} className="text-main" />
                        <h5 className="font-[500] text-base leading-6 ml-5">
                          {phone}
                        </h5>
                      </a>
                      <a
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-main transition-all duration-300"
                      >
                        <TfiEmail size={30} className="text-main" />
                        <h5 className="font-[500] text-base leading-6 ml-5">
                          {email}
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl border-0">
              <CardContent className="p-0">
                <h2 className="text-main font-manrope text-4xl font-semibold leading-10 mb-11">
                  Send Us A Message
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="full_name"
                      rules={{
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block mb-2 text-sm font-medium text-[#111827]">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              {/* <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3 text-gray-400">
                                <BiUser className="w-6 h-6" />
                              </span> */}
                              <Input
                                {...field}
                                type="text"
                                placeholder="Full name"
                                className="pl-12 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block mb-2 text-sm font-medium text-[#111827]">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              {/* <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3 text-gray-400">
                                <MdOutlineMailOutline className="w-6 h-6" />
                              </span> */}
                              <Input
                                {...field}
                                type="email"
                                placeholder="name@gmail.com"
                                className="pl-12 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: /^[\+]?[1-9][\d]{0,15}$/,
                          message: "Invalid phone number",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block mb-2 text-sm font-medium text-[#111827]">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              {/* <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3 text-gray-400">
                                <PhoneIcon className="w-6 h-6" />
                              </span> */}
                              <Input
                                {...field}
                                type="tel"
                                placeholder="+201065984343"
                                className="pl-20 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      rules={{
                        required: "Message is required",
                        minLength: {
                          value: 5,
                          message: "Message must be at least 10 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block mb-2 text-sm font-medium text-[#111827]">
                            Message
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              {/* <span className="absolute translate-y-2 left-0 flex items-center p-1 pl-3 text-gray-400">
                                <MdMessage className="w-6 h-6" />
                              </span> */}
                              <Textarea
                                {...field}
                                placeholder="Your message"
                                rows={6}
                                className="pl-12 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-main block w-full p-2.5 rounded-l-lg py-3 px-4 resize-none"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full text-[#FFFFFF] bg-main hover:bg-main-dark transition cursor-pointer focus:ring-4 focus:outline-hidden focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
