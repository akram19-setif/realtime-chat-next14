import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const existingConversations = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversations) {
      return new NextResponse("Invalid ID", { status: 400 });
    }
    const deletedConversation = await prisma?.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });
    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
