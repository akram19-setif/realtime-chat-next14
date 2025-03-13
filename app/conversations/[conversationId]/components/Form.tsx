"use client";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";

export default function Form() {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setValue("message", "", { shouldValidate: true });
    axios.post(`/api/messages`, { ...data, conversationId });
  };
  return (
    <div className='flex items-center gap-2 lg:gap-4 w-full border-t bg-white px-4 py-4'>
      <HiPhoto size={30} className='text-sky-500 cursor-pointer' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=' flex items-center gap-2 lg:gap-4 w-full'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <button
          type='submit'
          className='rounded-full bg-sky-500 p-2 cursor-pointer hover:bg-sky-600 transition'
        >
          <HiPaperAirplane size={18} className='text-white ' />
        </button>
      </form>
    </div>
  );
}
