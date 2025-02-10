import { useEffect, useRef, useState } from "react";
import { formatDate, formatTime } from "../utils/messages"; // Assuming the formatter is exported
import {io} from "socket.io-client";
import { useUser } from "../context/user.context";

const useChatSocket = (chatId, messages, setMessages) => {
  const [socket, setSocket] = useState(null);
  const { email } = useUser();

  useEffect(() => {
    if (!chatId) return;

    const newSocket = io("ws://localhost:4000", {
      path: "/chatapp/socket.io",
      auth: { chatId, email },
    });

    newSocket.onAny((event, ...args) => {
      console.log(`Socket event received: ${event}`, ...args);
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected to chat ID: ${chatId}`);
    });



    newSocket.on("message", (receivedMessage) => {
      console.log("Received message:", receivedMessage);

      const formattedMessage = {
        senderData: receivedMessage.senderData,
        message: receivedMessage.message,
        timestamp: formatTime(new Date(receivedMessage.timestamp)),
        type: receivedMessage.type,
      };
      const dateKey = formatDate(new Date(receivedMessage.timestamp));

      console.log(formattedMessage)

      setMessages((prevMessages) => {
        const lastDateGroup = prevMessages.messages[prevMessages.messages.length - 1];

        if (lastDateGroup?.date === dateKey) {
          return {
            ...prevMessages,
            messages: [
              ...prevMessages.messages.slice(0, -1),
              {
                ...lastDateGroup,
                chats: [...lastDateGroup.chats, formattedMessage],
              },
            ],
          };
        } else {
          return {
            ...prevMessages,
            messages: [
              ...prevMessages.messages,
              { date: dateKey, chats: [formattedMessage] },
            ],
          };
        }
      });
    });

    newSocket.on("error", (error) => {
      console.error("Socket.IO error:", error);
    })

    newSocket.on("disconnect", () => {
      console.log("Socket.IO connection closed");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

    /**
     * sendMessage: Sends a new message.
     *
     * @param {string} message - The message text to send.
     * @param {Function} [onSuccess] - (Optional) Callback after a successful send (e.g., to clear input).
     * @param {Function} [refreshData] - (Optional) Callback to re-fetch data if needed.
     */
    const sendMessage = async (message) => {
      if (!message) {
        window.alert("Please enter a message");
        return;
      }

      try {
        if (socket) {
          socket.emit("message", message);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        if(error.message){
          window.alert(error.message);
        }
      }
    };

  return { socket, messages, sendMessage };
};

export default useChatSocket;