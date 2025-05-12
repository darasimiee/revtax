import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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
}
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
}: FormFieldsProps) {
  const togglePassword = () => setIsVisible?.((prev) => !prev);
  return (
    <fieldset className={classname}>
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="text-[#667085] text-[14px] font-bold "
        >
          {label}
          {isRequired && <span className="text-red-600">*</span>}
        </label>
        {labelExtra}
      </div>
      <div className="mt-2 relative">
        <input
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          type={isVisible ? "text" : type}
          {...register(name, { validate })}
          className="h-[40px] w-full border-[2px] border-[#FCFCFD]
                 py-[2px] pl-3 text-black"
        />
        {type === "password" && (
          <span
            onClick={togglePassword}
            className="absolute right-[30px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-[12px]"
          >
            Show
          </span>
        )}
      </div>

      {errors[name] && (
        <span className="text-red-600 text-xs">
          {errors[name]?.message as string}
        </span>
      )}
    </fieldset>
  );
}
