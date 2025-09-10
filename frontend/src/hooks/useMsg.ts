import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { useEffect, useState } from "react";

export function useMessages(chatId: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc") // earliest → latest
    );

    // live subscription
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  return messages;
}
