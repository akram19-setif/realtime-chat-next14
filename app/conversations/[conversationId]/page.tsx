import EmptyState from "@/app/(site)/components/EmptyState";
import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Header from "./components/Header";
import Body from "./components/Body";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        {" "}
        <div
          className='h-full 
  flex flex-col'
        >
          <EmptyState />
        </div>{" "}
      </div>
    );
  }

  return (
    <div className='lg:pl-80 h-full '>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body />
      </div>{" "}
    </div>
  );
};

export default ConversationId;
