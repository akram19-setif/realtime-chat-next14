"use client";
import React, { useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages, conversationId]);
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();
    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((prev) => {
        if (
          find(prev, {
            id: message.id,
          })
        ) {
          return prev;
        } else {
          return [...prev, message];
        }
      });
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    pusherClient.bind("messages:new", messageHandler);
    const updateMessageHandler = (message: FullMessageType) => {
      setMessages((prev) => {
        return prev.map((item) => {
          if (item.id === message.id) {
            return message;
          } else {
            return item;
          }
        });
      });
    };
    pusherClient.bind("message:update", updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message?.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className='pt-24' />
    </div>
  );
};

export default Body;
