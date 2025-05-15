"use client";

import { useEffect, useState } from "react";
import Logo from "@/component/Logo";
import Image from "next/image";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OTP() {
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    // Add your resend logic here
    setTimeLeft(240); // Reset to 4 minutes
    setCanResend(false);
  };

  return (
    <div className="max-w-[445px] mx-auto mb-[99px] font-Neue">
      <div className="flex justify-between items-center mb-[24px]">
        <Logo />
        <Link href="./">
          <Image width={32} height={32} src="/darkmode.svg" alt="darkmode" />
        </Link>
      </div>
      <div className="mt-[90px] text-center flex flex-col justify-center items-center">
        <p className="text-lg font-medium">Mail Sent!</p>
        <p className="text-[#9494c7] text-center mt-2 max-w-[350px]">
          We have sent a mail to your email address. Please copy the 6-digit code
          you received and paste it here.
        </p>
        
        <div className="my-6">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="mt-[20px] text-[#667085] text-sm">
          {canResend ? (
            <button 
              onClick={handleResend}
              className="text-[#3A5CCC] font-medium hover:underline"
            >
              Resend code
            </button>
          ) : (
            `Didn't get the code? Resend in ${formatTime(timeLeft)}`
          )}
        </p>

        <button
            type="submit"
          
            className="w-[413px] bg-[#7F56D9] text-white font-semibold py-2  mt-4 rounded-md p-2 hover:bg-blue-500"
          >
            Reset Password
          </button>
      </div>
    </div>
  );
}