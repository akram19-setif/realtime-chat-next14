"use client";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface initialItemsProps {
  initialItems: FullConversationType[];
  users: User[] | undefined;
}

const ConversationList: React.FC<initialItemsProps> = ({
  initialItems,
  users,
}) => {
  const router = useRouter();
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, conversationId } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);
  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    const newHandler = (conversation: FullConversationType) => {
      setItems((prev) => {
        if (find(prev, { id: conversation.id })) {
          return prev;
        } else {
          return [...prev, conversation];
        }
      });
    };
    const updateHandler = (conversation: FullConversationType) => {
      setItems((prev) => {
        return prev.map((item) => {
          if (item.id === conversation.id) {
            return {
              ...item,
              messages: conversation.messages,
            };
          } else {
            return item;
          }
        });
      });
    };
    const removeHandler = (conversation: FullConversationType) => {
      setItems((prev) => {
        return [...prev.filter((item) => item.id !== conversation.id)];
      });
      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);
  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 w-full",
          isOpen ? "hidden" : " block w-full left-0"
        )}
      >
        <div className='px-5 '>
          <div className='flex justify-between mb-4 pt-4'>
            <div className='text-2xl font-bold text-neutral-800'>Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
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
    </>
  );
};

export default ConversationList;
