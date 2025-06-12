import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/app/libs/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const data = {
    user_id: session.user?.email as string,
  };
  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return res.send(authResponse);
}
