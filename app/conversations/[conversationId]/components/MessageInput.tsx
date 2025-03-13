"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
  required?: boolean;
  placeholder?: string;
  id: string;
}
const MessageInput: React.FC<MessageInputProps> = ({
  register,
  errors,
  required,
  placeholder,
  id,
  type,
}) => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        aria-invalid={errors[id] ? "true" : "false"}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
      {errors[id] && <span role='alert'>This field is required</span>}
    </div>
  );
};

export default MessageInput;
