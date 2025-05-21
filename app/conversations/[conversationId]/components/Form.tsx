"use client";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

export default function Form() {
  const { conversationId } = useConversation(); // Keep this as it might be needed later
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
    console.log("Form onSubmit called with data:", data); // For form submission
    setValue("message", "", { shouldValidate: true });
    axios.post(`/api/messages`, { ...data, conversationId });
  };

  // Let's try the simplest possible inline onUpload first
  const handleUpload = (result: any) => {
    if (
      result.info &&
      typeof result.info === "object" &&
      "secure_url" in result.info
    ) {
      axios.post(`/api/messages`, {
        image: (result.info as { secure_url: string }).secure_url,
        conversationId,
      });
    }
  };

  return (
    <div className='flex items-center gap-2 lg:gap-4 w-full border-t bg-white px-4 py-4'>
      <CldUploadButton
        uploadPreset='v9r1tp3k' // Your preset
        onSuccess={handleUpload}
        onError={(error: any, widget: any) => {
          console.error("--- CldUploadButton onError CALLED (inline) ---");
        }}
        // onUploadAdded={(result: any, widget: any) => {
        //   // Another event to test
        //   console.log("--- CldUploadButton onUploadAdded CALLED (inline) ---");
        //   console.log("onUploadAdded Result:", result);
        //   console.log("onUploadAdded Widget:", widget);
        // }}
      >
        <HiPhoto size={30} className='text-sky-500 cursor-pointer' />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=' flex items-center gap-2 lg:gap-4 w-full'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          // required // Temporarily remove to simplify if needed
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
