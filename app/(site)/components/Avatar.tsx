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
    </div>
  );
}

export default Avatar;
