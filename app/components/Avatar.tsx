"user client";
import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
interface AvatarProps {
  user?: User;
}
function Avatar({ user }: AvatarProps) {
  return (
    <div className='relative'>
      <div
        className='relative inline-block overflow-hidden rounded-full
  h-9 w-9 md:h-11 md:w-11 '
      >
        <Image src={user?.image || "/placeholder.jpg"} fill alt='avatar' />
      </div>
      <span className='absolute block rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900 h-2 w-2 top-0 right-0 md:h-3 md:w-3' />
    </div>
  );
}

export default Avatar;
