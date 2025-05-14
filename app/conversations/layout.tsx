import SideBar from "../components/sidebar/SideBar";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";

export default async function conversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <SideBar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} />
        {children}{" "}
      </div>
    </SideBar>
  );
}
