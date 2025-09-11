import app from "./app.js";
import WebSocket, { WebSocketServer } from "ws";
import { db } from "./config/firebase-admin.js";

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log("app is listneing on port", PORT);
});

//initialize a websocket server with the http server
const wss = new WebSocketServer({ server });

//map to store the online users
const clients = new Map<string, WebSocket>();

wss.on("connection", (ws, req) => {
  const userId = new URL(req.url!, "https://bhandara-vqid.onrender.com").searchParams.get(
    "userId"
  )!;
  clients.set(userId, ws);


  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message.toString());

      const chatId = [data.senderId, data.receiverId].sort().join("_");

      //maybe separate this
      const chatRef = db.collection("chats").doc(chatId);

      await chatRef.set(
        {
          participants: [data.senderId, data.receiverId],
          lastMessage: data.text,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      const messageRef = chatRef.collection("messages").doc();
      await messageRef.set({
        text: data.text,
        senderId: data.senderId,
        receiverId: data.receiverId,
        timestamp: new Date(),
      });

      //send msg to user if online
      //not fetching from the db because user is online
      //the fresh data that is in memory can be shown
      //to the user right now, its stored in db anyways
      //its done to store time and resources

      const receiverWs = clients.get(data.receiverId);
      if (receiverWs && receiverWs.readyState === ws.OPEN) {
        receiverWs.send(
          JSON.stringify({
            id: messageRef.id,
            ...data,
            timestamp: new Date(),
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  });

  ws.on("close", () => {
    clients.delete(userId);
  });
});