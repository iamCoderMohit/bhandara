import { useEffect, useRef } from "react";

export function useChat(userId: string) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;

    // open connection when hook mounts
    const ws = new WebSocket(`ws://localhost:3000?userId=${userId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected as", userId);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Received:", data);
      // here you can dispatch to Redux, setState, etc.
    };

    ws.onclose = () => {
      console.log("❌ WebSocket disconnected");
      wsRef.current = null;
    };

    return () => {
      ws.close(); // cleanup on unmount
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
