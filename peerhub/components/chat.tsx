import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connectSocket, sendMessage, onMessage } from "../lib/socket";
import { saveMessage, getMessages } from "../lib/messages";

const Chat: React.FC<{ room: string; username: string; picture: string }> = ({
  room,
  username,
  picture,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const socket = connectSocket(room);
    onMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      saveMessage({ roomId: room, content: message });
    });

    // Load existing messages when component mounts
    getMessages(room).then((messagesFromDB) => {
      setMessages(messagesFromDB.map((msg) => msg.content));
    });

    return () => {
      socket?.close();
    };
  }, [room]);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageInput = document.getElementById(
      "message-input"
    ) as HTMLInputElement;
    const message = messageInput.value;
    sendMessage(message);
    messageInput.value = "";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat Room: {room}</h1>
      <div className="flex items-center mb-4">
        <img
          src={picture}
          alt={username}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-semibold">{username}</span>
      </div>
      <ul className="mb-4 space-y-2">
        {messages.map((message, index) => (
          <li key={index} className="px-4 py-2 border rounded-lg bg-gray-100">
            {message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage} className="space-y-2">
        <input
          id="message-input"
          type="text"
          placeholder="Type your message..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
