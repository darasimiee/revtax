import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

interface FormFieldsProps {
  type: string;
  id: string;
  name: string;
  label?: string;
  placeholder: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  isVisible?: boolean;
  validate?: (value: string) => string | undefined;
  isRequired?: boolean;
  disabled?: boolean;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  classname?: string;
  labelExtra?: React.ReactNode;
  withCountryCode?: boolean;
  defaultCountryCode?: string;
}

const countryCodes = [
  { code: "+234", flag: "🇳🇬" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+233", flag: "🇬🇭" },
];

export default function FormFields({
  type,
  id,
  name,
  label,
  placeholder,
  register,
  errors,
  isVisible,
  setIsVisible,
  isRequired,
  disabled,
  validate,
  classname,
  labelExtra,
  withCountryCode = false,
  defaultCountryCode = "+1",
}: FormFieldsProps) {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find((c) => c.code === defaultCountryCode) || countryCodes[0]
  );
  // const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); // Default to Nigeria
  const togglePassword = () => setIsVisible?.((prev) => !prev);

  return (
    <fieldset className={classname}>
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="text-[#667085] text-[14px] font-bold flex items-center gap-1 dark:text-[#CECFD2]"
        >
          {isRequired && <span className="text-red-600">*</span>}
          {label}
        </label>
        <div className="dark:text-[#94969C]">{labelExtra}</div>
      </div>

      <div className="mt-2">
        {withCountryCode && type === "tel" ? (
          <div className="flex items-center border-[1px] dark:border-[#393B41] border-[#E4E7EC] rounded-md h-[48px]">
            {/* Country code selector */}
            <div className="relative flex items-center px-3 dark:border-[#393B41] border-r border-[#E4E7EC] h-full">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center focus:outline-none"
              >
                <span className="mr-1">{selectedCountry.flag}</span>
                <span className="text-zinc-800">{selectedCountry.code}</span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
              </button>

              {showCountryDropdown && (
                <div className="absolute z-10 top-full left-0 mt-1 bg-white border dark:bg-[#393B41] dark:border-[#393B41] border-gray-200 rounded-md shadow-lg w-48 max-h-60 overflow-auto">
                  {countryCodes.map((country) => (
                    <div
                      key={country.code}
                      className="px-3 py-2 hover:bg-[#F2F4F7] cursor-pointer flex items-center"
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountryDropdown(false);
                      }}
                    >
                      <span className="mr-2">{country.flag}</span>
                      <span className="mr-2">{country.code}</span>
                      {/* <span className="text-gray-500 text-sm">{country.name}</span> */}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Phone number input */}
            <input
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              type="tel"
              {...register(name, { validate })}
              className="flex-1 h-full px-3 text-zinc-800 border-none focus:ring-0"
            />
          </div>
        ) : (
          <div className="relative">
            <input
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              type={isVisible ? "text" : type}
              {...register(name, { validate })}
              className="h-[48px] w-full border-[1px] border-[#E4E7EC] rounded-md py-[2px] pl-3 text-zinc-800 pr-10 dark:border-[#393B41]"
            />

            {type === "password" && setIsVisible && (
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={isVisible ? "Hide password" : "Show password"}
              >
                {isVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="text-red-600 text-xs block mt-1">
          {errors[name]?.message as string}
        </span>
      )}
    </fieldset>
  );
}
