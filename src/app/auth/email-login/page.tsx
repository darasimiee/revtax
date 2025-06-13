"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormData, loginSchema } from "@/lib/formSchema";
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
import { ModeToggle } from "@/component/Logotheme";
import useMetaArgs from "@/hooks/useMetaArgs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


const imageChallenges = [
  {
    id: 1,
    question: "Select all images with cars",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8", isCorrect: true },
      { id: 2, url: "https://images.unsplash.com/photo-1470004914212-05527e49370b", isCorrect: false },
      { id: 3, url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", isCorrect: true },
      { id: 4, url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab", isCorrect: false },
      { id: 5, url: "https://images.unsplash.com/photo-1553440569-bcc63803a83d", isCorrect: true },
      { id: 6, url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2", isCorrect: false },
    ]
  },
  {
    id: 2,
    question: "Select all images with traffic lights",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1", isCorrect: false },
      { id: 2, url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000", isCorrect: true },
      { id: 3, url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c", isCorrect: true },
      { id: 4, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", isCorrect: false },
      { id: 5, url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0", isCorrect: false },
      { id: 6, url: "https://images.unsplash.com/photo-1519406709381-c1f293304b28", isCorrect: false },
    ]
  }
];
export default function LoginPage() {
  useMetaArgs({
    title: "Login - Revtax",
    description: "Revenue and tax collection",
    keywords: "Revenue, taxes",
  });

  const { theme } = useTheme();
  const [activeButton, setActiveButton] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleCheckboxClick = () => {
    if (!isVerified) {
      setShowCaptchaModal(true);
      // Randomly select a challenge
      setCurrentChallenge(Math.floor(Math.random() * imageChallenges.length));
    }
  };

  const handleImageSelect = (imageId: number) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter(id => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const verifyCaptcha = () => {
    const challenge = imageChallenges[currentChallenge];
    const correctSelections = challenge.images
      .filter(img => img.isCorrect)
      .map(img => img.id);
    
    const allCorrectSelected = correctSelections.every(id => selectedImages.includes(id));
    const noIncorrectSelected = selectedImages.every(id => 
      challenge.images.find(img => img.id === id)?.isCorrect
    );

    if (allCorrectSelected && noIncorrectSelected && selectedImages.length > 0) {
      setIsVerified(true);
      setShowCaptchaModal(false);
      setSelectedImages([]);
      setVerificationError("");
    } else {
      setVerificationError("Please select all correct images. Try again.");
      setSelectedImages([]);
    }
  };

  const onFormSubmit: SubmitHandler<LoginFormData> = (data) => {
    if (!isVerified) {
      setVerificationError("Please complete the verification");
      return;
    }
    console.log(data);
  };

  return (
    <div className="max-w-[445px] mx-auto font-Neue">
      <div className="flex justify-between items-center mb-[24px]">
        <Logo />
        <ModeToggle />
      </div>

      <h1 className="font-bold text-[14px] text-[#182230] mb-[10px] dark:text-[#F0F1F1] ">
        Login type
      </h1>
      <Select>
        <SelectTrigger className="w-[100%] h-[48px] rounded-md">
          <SelectValue
            placeholder={
              <>
                {theme === "dark" ? (
                  <Image
                    width={13.3}
                    height={12}
                    src="/users-rightdark.svg"
                    alt="user"
                  />
                ) : (
                  <Image
                    width={13.3}
                    height={12}
                    src="/users-right.svg"
                    alt="user"
                  />
                )}
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
      <div className=" dark:border-[#393B41] border border-[#E4E7EC] w-[100%] h-[484px] mt-5 rounded-md">
        <div className=" dark:border-[#393B41] border border-[#E4E7EC] p-2 rounded-full mt-5 w-[413px] h-[41px] justify-between items-center flex mx-auto">
          <button
            onClick={() => setActiveButton("login")}
            className={
              activeButton === "login"
                ? " dark:border-[#393B41] dark:text-[#F5F5F6] dark:bg-[#393B41] border border-[#E4E7EC] rounded-full px-8 py-1 w-[203px] text-[#101828] font-medium text-base"
                : "px-4 py-1 text-[#667085] dark:text-[#94969C]"
            }
          >
            Login
          </button>
          <button
            onClick={() => setActiveButton("createAccount")}
            className={
              activeButton === "createAccount"
                ? " dark:border-[#393B41] dark:text-[#F5F5F6] dark:bg-[#393B41] border border-[#E4E7EC] rounded-full px-8 py-1 w-[203px] text-[#101828] font-medium text-base"
                : "px-4 py-1 text-[#667085] dark:text-[#94969C]"
            }
          >
            Create Account
          </button>
        </div>

        <h1 className=" dark:text-[#F0F1F1] items-center flex justify-center mt-5 font-bold text-base text-[#182230]">
          Welcome back!
        </h1>
        <h1 className=" dark:text-[#94969C] items-center flex justify-center font-normal mt-1 mb-4 text-sm text-[#667085]">
          Please enter your payer details to access your account.
        </h1>

        <form onSubmit={handleSubmit(onFormSubmit)} className="text-center">
          <FormFields
            type="text"
            name="email" //I should remember to change this from the API given
            label="Email Address"
            labelExtra={
              <div>
                <Link
                  href={"/auth/mobile-login"}
                  className="dark:text-[#94969C] text-[#667085] text-[12px] font-bold underline underline-offset-1"
                >
                  Use phone number instead
                </Link>
              </div>
            }
            placeholder="Enter your email address"
            id="email"
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
                  href={"/auth/forgotpassword"}
                  className="text-[#667085]  dark:text-[#94969C] text-[12px] font-bold underline underline-offset-1"
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
            classname="mb-2 p-2 "
          />

         <div 
          className="dark:border-[#393B41] border border-[#E4E7EC] p-[8px] border-h-[57px] rounded-md mt-5 w-[413px] h-[41px] justify-between items-center flex mx-auto cursor-pointer"
          onClick={handleCheckboxClick}
        >
          <div className="flex items-center">
            <Checkbox checked={isVerified} />
            <span className="text-[#475467] ml-3 dark:text-[#CECFD2]">
              I am not a robot
            </span>
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

        {verificationError && (
          <p className="text-red-500 text-sm mt-2">{verificationError}</p>
        )}

        {/* CAPTCHA Modal */}
        <Dialog open={showCaptchaModal} onOpenChange={setShowCaptchaModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Verify you&apos;re human</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="font-medium">
                {imageChallenges[currentChallenge].question}
              </p>
              
              <div className="grid grid-cols-3 gap-2">
                {imageChallenges[currentChallenge].images.map((image) => (
                  <div 
                    key={image.id}
                    className={`relative border rounded-md cursor-pointer ${
                      selectedImages.includes(image.id) 
                        ? "border-blue-500 ring-2 ring-blue-300" 
                        : "border-gray-200"
                    }`}
                    onClick={() => handleImageSelect(image.id)}
                  >
                    <Image
                      src={image.url}
                      alt="captcha challenge"
                      width={120}
                      height={120}
                      className="w-full h-auto"
                    />
                    {selectedImages.includes(image.id) && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {verificationError && (
                <p className="text-red-500 text-sm">{verificationError}</p>
              )}

              <button
                type="button"
                onClick={verifyCaptcha}
                className="w-full bg-[#7F56D9] text-white font-normal py-2 mt-2 rounded-md hover:bg-blue-500"
              >
                Verify
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <button
          type="submit"
          disabled={isSubmitting || !isVerified}
          className="w-[413px] bg-[#7F56D9] text-white font-normal py-2 mt-4 rounded-md p-2 hover:bg-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login"
          )}
        </button>
        </form>
      </div>
      <div className=" dark:border-[#393B41] border border-[#E4E7EC] p-[8px] mx-auto rounded-md flex justify-between items-center mt-3 text-[#667085] text-[14px] font-medium dark:text-[#CECFD2]">
        <p>New to Revtax?</p>
        <div className="flex justify-center items-center border w-fit bg-[#F2F4F7] p-2 rounded-md dark:bg-[#252629] dark:text-[#CECFD2] ">
          {theme === "dark" ? (
            <Image
              width={13.33}
              height={12}
              src="/users-rightdark.svg"
              alt="user logo"
            />
          ) : (
            <Image
              width={13.33}
              height={12}
              src="/users-right.svg"
              alt="user logo"
            />
          )}

          <Link href={"/"} className="ml-2 ">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
