"use client";
import clsx from "clsx";
import React, { useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface initialItemsProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<initialItemsProps> = ({ initialItems }) => {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const { isOpen, conversationId } = useConversation();
  return (
    <aside
      className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 w-full",
        isOpen ? "hidden" : " block w-full left-0"
      )}
    >
      <div className='px-5 '>
        <div className='flex justify-between mb-4 pt-4'>
          <div className='text-2xl font-bold text-neutral-800'>
            Conversations
          </div>
          <div
            className='rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75
        transition'
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => {
          return (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default ConversationList;
