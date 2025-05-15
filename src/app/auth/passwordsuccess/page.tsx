"use client";

import Logo from "@/component/Logo";
import Image from "next/image";
import Link from "next/link";

export default function PasswordSuccess() {
  return (
    <div className="max-w-[445px] mx-auto  mb-[100px] font-Neue">
      <div className="flex justify-between items-center mb-[99px]">
        <Logo />
        <Link href="./">
          <Image width={32} height={32} src="/darkmode.svg" alt="darkmode" />
        </Link>
      </div>

      <div className="max-h-[210px] text-center flex flex-col justify-center items-center">
        <Image
          width={40}
          height={40}
          src="/Check circle.svg"
          alt="checkcircle"
        />
        <p className="text-lg font-medium">You are all set!</p>
        <p className="text-[#9494c7] text-center mt-2 max-w-[350px]">
          Your password has been succesly reset.
        </p>
        <p className="text-[#9494c7] text-center mt-2 max-w-[350px]">
          Login with your Tax ID and your password.
        </p>

        <button
          type="submit"
          className="w-[413px]  flex justify-center bg-[#7F56D9] text-[14px] text-white font-medium py-2  mt-4 rounded-md p-2 hover:bg-blue-500"
        >
          Go to login page{" "}
          <Image width={12} height={12} src="/Icon.svg" alt="Icon" className="ml-3" />
        </button>
      </div>
    </div>
  );
}
