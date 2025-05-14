"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { mobileLoginSchema, MobileLoginFormData } from "@/lib/formSchema";
import Logo from "@/component/Logo";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { logintype } from "@/lib/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import FormFields from "@/component/FormFields";
import { FieldValues, useForm, type SubmitHandler } from "react-hook-form";

export default function MobileLoginPage() {
  const [activeButton, setActiveButton] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(mobileLoginSchema) });

  const onFormSubmit: SubmitHandler<MobileLoginFormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-[445px] mx-auto font-Neue">
      <div className="flex justify-between items-center mb-[24px]">
        <Logo />
        <Link href="./">
          <Image width={32} height={32} src="/darkmode.svg" alt="darkmode" />
        </Link>
      </div>

      <h1 className="font-bold text-[14px] text-[#182230] mb-[10px] ">
        Login type
      </h1>
      <Select>
        <SelectTrigger className="w-[100%] h-[48px] rounded-md">
          <SelectValue
            placeholder={
              <>
                <Image
                  width={13.3}
                  height={12}
                  src="/users-right.svg"
                  alt="user"
                />
                Select Login type
              </>
            }
          />
        </SelectTrigger>

        <SelectContent className="font-Neue font-normal">
          {logintype.map(({ id, name, icon }) => (
            <SelectItem key={id} value={name}>
              <Image width={16} height={16} src={icon} alt="user" />
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="border border-[#E4E7EC] w-[100%] h-[484px] mt-5 rounded-md">
        <div className="border border-[#E4E7EC] p-2 rounded-full mt-5 w-[413px] h-[41px] justify-between items-center flex mx-auto">
          <button
            onClick={() => setActiveButton("login")}
            className={
              activeButton === "login"
                ? "border border-[#E4E7EC] rounded-full px-8 py-1 w-[203px] text-[#101828] font-medium text-base"
                : "px-4 py-1 text-[#667085]"
            }
          >
            Login
          </button>
          <button
            onClick={() => setActiveButton("createAccount")}
            className={
              activeButton === "createAccount"
                ? "border border-[#E4E7EC] rounded-full px-8 py-1 w-[203px] text-[#101828] font-medium text-base"
                : "px-4 py-1 text-[#667085]"
            }
          >
            Create Account
          </button>
        </div>

        <h1 className="items-center flex justify-center mt-5 font-bold text-base text-[#182230]">
          Welcome back!
        </h1>
        <h1 className="items-center flex justify-center font-normal mt-1 mb-4 text-sm text-[#667085]">
          Please enter your payer details to access your account.
        </h1>

        <form onSubmit={handleSubmit(onFormSubmit)} className="text-center">
          <FormFields
            type="tel"
            name="phoneNumber" //I should remember to change this from the API given
            placeholder="000 000 0000"
            withCountryCode={true}
            defaultCountryCode="+234"
            label="Phone Number"
            labelExtra={
              <div>
                <Link
                  href={"/auth/email-login"}
                  className="text-[#667085] text-[12px] font-bold underline underline-offset-1"
                >
                  Use email address instead
                </Link>
              </div>
            }
            id="mobile"
            errors={errors}
            register={register as FieldValues["register"]}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            classname="mb-2 p-2"
            //validate={(value) => validateEmail(value)}
          />
          <FormFields
            type="password"
            label="Password"
            labelExtra={
              <div>
                <Link
                  href={"/forgotpassword"}
                  className="text-[#667085] text-[12px] font-bold underline underline-offset-1"
                >
                  Forgot Password?
                </Link>
              </div>
            }
            name="password"
            placeholder="Password"
            id="username"
            errors={errors}
            register={register as FieldValues["register"]}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            classname="mb-2 p-2 border-[1px] border-[#F9FAFB]"
            //validate={(value) => validatePassword(value)}
          />

          <div className="border border-[#E4E7EC] p-[8px] border-h-[57px] rounded-md mt-5 w-[413px] h-[41px] justify-between items-center flex mx-auto">
            <div>
              <Checkbox />
              <span className="text-[#475467] ml-3">I am not a robot</span>
            </div>
            <div className="flex gap-4 justify-center">
              <Image
                width={22.96}
                height={12.74}
                src="/reCaptcha logo.svg"
                alt="captchalogo"
              />
              <Image
                width={73}
                height={11.45}
                src="/Vector.svg"
                alt="recaptcha"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[413px] bg-[#7F56D9] text-white font-semibold py-2 mt-4 rounded-md p-2 hover:bg-blue-500"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
      <div className="border border-[#E4E7EC] p-[8px] mx-auto rounded-md flex justify-between items-center mt-3 text-[#667085] text-[14px] font-medium">
        <p>New to Revtax?</p>
        <div className="flex justify-center items-center border w-fit bg-[#F2F4F7] p-2 rounded-md ">
          <Image
            width={13.33}
            height={12}
            src="/users-right.svg"
            alt="user logo"
          />
          <Link href={"/"} className="ml-2 ">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
