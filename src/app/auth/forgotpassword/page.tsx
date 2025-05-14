"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/lib/formSchema";
import Logo from "@/component/Logo";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import FormFields from "@/component/FormFields";
import { FieldValues, useForm, type SubmitHandler } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onFormSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      // API call here 
      console.log("Password reset requested for:", data);
      
      // Await API here too
      
      // Redirect to OTP verification page after successful submission
      router.push("/auth/verify-otp");
    } catch (error) {
      console.error("Password reset error:", error);
      // show some toast here
    }
  };

  return (
    <div className="max-w-[445px] mx-auto font-Neue">
      <div className="flex justify-between items-center mb-[24px]">
        <Logo />
        <Link href="./">
          <Image width={32} height={32} src="/darkmode.svg" alt="darkmode" />
        </Link>
      </div>

      <div className="border border-[#E4E7EC] w-[100%] h-[376px] mt-[40px] rounded-md">
        <div className="flex flex-col items-center text-center">
          <h1 className="mt-5 font-bold text-[20px] text-[#182230]">
            Forgot Password
          </h1>
          <h1 className="mt-1 mb-4 text-[14px] font-normal text-[#667085]">
            Seems you forgot your password. No worries, we&apos;ll help you
            recover your account.
          </h1>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="text-center">
          <FormFields
            type="text"
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            id="email"
            errors={errors}
            register={register as FieldValues["register"]}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            classname="mb-2 p-2"
          />
          <FormFields
            type="tel"
            label="Phone number"
            withCountryCode={true}
            defaultCountryCode="+234"
            name="phoneNumber"
            placeholder="000 000 0000"
            id="phonenumber"
            errors={errors}
            register={register as FieldValues["register"]}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            classname="mb-2 p-2 border-[1px] border-[#F9FAFB]"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[413px] bg-[#7F56D9] text-white font-semibold py-2 mt-1 rounded-md p-2 hover:bg-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Reset password"
            )}
          </button>
        </form>
      </div>
      
      <div className="border border-[#E4E7EC] p-[8px] mx-auto rounded-md flex justify-between items-center mt-3 text-[#667085] text-[14px] font-medium">
        <p>Remember password?</p>
        <div className="flex justify-center items-center border w-fit bg-[#F2F4F7] p-2 rounded-md">
          <Image
            width={13.33}
            height={12}
            src="/users-right.svg"
            alt="user logo"
          />
          <Link href={"/auth/email-login"} className="ml-2 text-[#475467]">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}