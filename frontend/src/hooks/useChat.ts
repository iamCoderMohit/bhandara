import { useEffect, useRef } from "react";

export function useChat(userId: string) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(`ws://localhost:3000?userId=${userId}`);
    wsRef.current = ws;

    ws.onopen = () => {
    };

    ws.onmessage = (event) => {
      JSON.parse(event.data);
    };

    ws.onclose = () => {
      wsRef.current = null;
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  const sendMessage = (receiverId: string, text: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          senderId: userId,
          receiverId,
          text,
        })
      );
    } else {
      console.error("⚠️ WebSocket not connected yet");
    }
  };

  return { sendMessage };
}
