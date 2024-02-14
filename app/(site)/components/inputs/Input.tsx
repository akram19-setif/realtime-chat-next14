"use client";
import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={clsx("block text-sm font-medium leading-6 text-gray-900", {
          "text-red-500": errors[id],
        })}
      >
        {label}
      </label>
      <div className='mt-2'>
        <input
          type={type}
          id={id}
          autoComplete='id'
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            "form-input appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none ring-gray-300 focus:ring-2 ring-1 focus:ring-inset focus:ring-sky-600 sm:text-sm sm!leading-6",

            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
