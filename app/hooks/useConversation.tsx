import { useParams } from "next/navigation";
import { useMemo } from "react";
const useConversation = () => {
  const params = useParams();
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }
    return params.conversationId as string;
  }, [params?.conversationId]);
  return useMemo(
    () => ({
      conversationId,
    }),
    [conversationId]
  );
  // eslint-disable-next-line
  const isOpen = useMemo(() => !!conversationId, [conversationId]);
  // eslint-disable-next-line
  return useMemo(
    () => () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};
