"use client";
import Avatar from "@/app/(site)/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface headerProps {
  conversation: Conversation & {
    users: User[];
  };
}
function Header({ conversation }: headerProps) {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);
  return (
    <div
      className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 justify-between
  items-center shadow-sm'
    >
      <div className='flex gap-3 items-center'>
        <Link
          className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
          href={"/conversations"}
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className='flex flex-col '>
          <div className=''>{conversation.name || otherUser.name}</div>
          <div className='text-sm font-light text-neutral-500'>
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
        onClick={() => {}}
      />
    </div>
  );
}

export default Header;
