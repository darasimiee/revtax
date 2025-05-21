"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormData, } from "@/lib/formSchema";
import Logo from "@/component/Logo";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { domicile, logintype, payerType } from "@/lib/constant";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function DiasporaPage() {
  const [activeButton, setActiveButton] = useState("login");
 
  const form = useForm({
    // resolver: zodResolver(),
  });
  const onFormSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-[445px] mx-auto font-Neue ">
      <div className="flex justify-between items-center mb-[24px]">
        <Logo />
        <Link href="./">
          <Image width={32} height={32} src="/darkmode.svg" alt="darkmode" />
        </Link>
      </div>

      
      <div className="border border-[#E4E7EC] w-[100%] min-h-[484px] mt-5 py-5 rounded-md">
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
        <div className="p-4">
          <h1 className=" font-bold text-base text-[#182230]">
            Create an account
          </h1>
          <h1 className=" font-normal text-sm text-[#667085]">
            Provide your details, let&apos;s get you set up in no time
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="text-center">
            <div className=" p-4 flex justify-between">
              <div className="flex flex-col items-start ">

                 <FormField
                  control={form.control}
                  name="taxpayertype" //From backend
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax payer type<span className="text-red-600">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[197px]">
                            <SelectValue placeholder="Select a taxpayer type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {payerType.map(({ id, name }) => (
                            <SelectItem key={id} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               

              
              </div>
              <div className="flex flex-col items-start">
                <FormField
                  control={form.control}
                  name="domicile" //From backend
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domicile<span className="text-red-600">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[197px]">
                            <SelectValue placeholder="Select a domicile account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {domicile.map(({ id, name }) => (
                            <SelectItem key={id} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-4 flex flex-col">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Passport Number<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your passport number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <label htmlFor="passport" className="cursor-pointer border-[1px] max-w-[410px] mx-auto h-[114px] rounded-md flex flex-col justify-center text-center items-center ">
                <Image width={32} height={32} src="/passportimage.svg" alt="image" className="mt-6"/>
                <p className="text-[14px]">Click here to upload your file or drag and drop</p>
                <p className="text-[#98A2B3] text-[12px]">
                    Supported Format: JPEG, JPG, PNG(10MB Max)
                </p>

            </label>
            <FormField
          control={form.control}
          name="passport"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input type="file" placeholder="shadcn" {...field} className="hidden" accept="image/*" id="passport"/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        {/* For the image to show, I need to ask backend if it should be sent as base64 or url string and if the user wants the preview of the file */}
            <div className="p-4 flex flex-col">
              
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth<span className="text-red-600">*</span></FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              disabled={form.formState.isSubmitting}
              className="w-[413px] bg-[#7F56D9] text-white font-semibold py-2  mx-auto mt-4 rounded-md p-2 hover:bg-blue-500"
            >
              {form.formState.isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Proceed"
              )}
            </button>
          </form>
        </Form>
      </div>
      <div className="border border-[#E4E7EC] p-[8px] mx-auto rounded-md flex justify-between items-center mt-3 text-[#667085] text-[14px] font-medium">
        <p>Already joined RevTax?</p>
        <div className="flex justify-center items-center border w-fit bg-[#F2F4F7] p-2 rounded-md ">
          <Image
            width={13.33}
            height={12}
            src="/users-right.svg"
            alt="user logo"
          />
          <Link href={"/auth/email-login"} className="ml-2 ">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
