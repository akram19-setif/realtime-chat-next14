"use client";
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

interface userBoxProps {
  data: User;
}
function UserBox({ data }: userBoxProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/users/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);
  return (
    <div
      className='cursor-pointer hover:bg-neutral-100  transition w-full relative flex items-center gap-3 bg-white p-4 rounded-lg'
      onClick={handleClick}
    >
      <Avatar user={data} />
      <div className='min-w-0 flex-1'>
        <div className='flex justify-between items-center mb-1'>
          <p className='text-sm font-medium text-gray-900 truncate'>
            {data.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserBox;
