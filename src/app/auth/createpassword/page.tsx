"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/lib/formSchema";
import Logo from "@/component/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFields from "@/component/FormFields";
import { FieldValues, useForm, type SubmitHandler } from "react-hook-form";
import { ModeToggle } from "@/component/Logotheme";

export default function CreatePasswordPage() {
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
      <div className="flex justify-between items-center mb-[90px]">
        <Logo />
        <ModeToggle />
      </div>

      <div className="border border-[#E4E7EC] w-[100%] h-[376px] mt-[40px] rounded-md">
        <div className="flex flex-col items-center text-center">
          <h1 className="mt-5 font-bold text-[20px] text-[#182230]">
            Create new password
          </h1>
          <h1 className="mt-1 mb-4 text-[14px] font-normal text-[#667085]">
            Secure your account by setting up a password
          </h1>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="text-center">
          <FormFields
            type="password"
            name="password"
            label="Create Password"
            placeholder="Password"
            id="password"
            errors={errors}
            register={register as FieldValues["register"]}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            classname="mb-2 p-2"
          />
          <FormFields
            type="password"
            label="Confirm password"
            name="password"
            placeholder="Confirm password"
            id="password"
            errors={errors}
            register={register as FieldValues["register"]}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            classname="mb-2 p-2 border-[1px] border-[#F9FAFB]"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[413px] bg-[#7F56D9] text-white font-medium py-2 mt-1 rounded-md p-2 hover:bg-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Proceed"
            )}
          </button>
        </form>
      </div>
      
      
    </div>
  );
}