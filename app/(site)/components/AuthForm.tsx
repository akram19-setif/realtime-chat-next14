"use client";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./inputs/Input";
import Button from "./Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Varient = "LOGIN" | "REGISTER";
function AuthForm() {
  const [variant, setVariant] = useState<Varient>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else if (variant === "REGISTER") {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);

    if (variant === "REGISTER") {
      axios
        .post(`/api/register`, data)
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
      setIsLoading(false);
    }
    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Login Success!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Login Success!");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div
      className='mt-8 sm:mx-auto
  sm:w-full
  sm:max-w-md'
    >
      <div
        className='bg-white px-4
    py-8
    shadow sm:rounded-lg sm:px-10'
      >
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label='Name'
              register={register}
              id='name'
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            label='Email'
            register={register}
            id='email'
            errors={errors}
            type='email'
            disabled={isLoading}
          />
          <Input
            label='Password'
            register={register}
            id='password'
            errors={errors}
            type='password'
            disabled={isLoading}
          />
          <div className=''>
            <Button type='submit' fullWidth disabled={isLoading}>
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className='mt-6'>
          <div className='relative '>
            <div className='absolute inset-0 flex items-center '>
              <div className='w-full border-t border-gray-300 ' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>
          <div className='mt-6 gap-2 flex '>
            <AuthSocialButton
              onClick={() => socialAction("github")}
              icon={BsGithub}
            />
            <AuthSocialButton
              onClick={() => socialAction("google")}
              icon={BsGoogle}
            />
          </div>
        </div>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div className=''>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div className='underline cursor-pointer' onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
