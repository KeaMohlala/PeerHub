import io from "socket.io-client";

let socket: SocketIOClient.Socket | null = null;

export function connectSocket(roomId: string) {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", {
      query: { roomId },
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }

  return socket;
}

export function sendMessage(message: string) {
  if (socket) {
    socket.emit("chat_message", message);
  }
}

export function onMessage(callback: (message: string) => void) {
  if (socket) {
    socket.on("chat_message", callback);
  }
}
