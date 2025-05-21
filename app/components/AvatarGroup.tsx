"user client";
import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
interface AvatarGroupProps {
  users?: User[];
}
function AvatarGroup({ users = [] }: AvatarGroupProps) {
  const slicedUsers = users?.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0 ",
    2: "bottom-0 right-0",
  };
  return (
    <div className='relative h-11 w-11'>
      {slicedUsers?.map((user, index) => (
        <div
          key={user.id}
          className={`absolute ${
            positionMap[index as keyof typeof positionMap]
          } z-10 inline-block overflow-hidden rounded-full h-[21px] w-[21px] `}
        >
          <Image
            src={user?.image || "/images/placeholder.jpg"}
            alt='Avatar'
            fill
          />
        </div>
      ))}
    </div>
  );
}

export default AvatarGroup;
