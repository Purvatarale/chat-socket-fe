import { useEffect, useRef, useState } from "react";
import { formatDate, formatTime } from "../utils/messages"; // Assuming the formatter is exported
import {io} from "socket.io-client";
import { useUser } from "../context/user.context";

const useChatSocket = (chatId, messages, setMessages) => {
  const [socket, setSocket] = useState(null);
  const { email } = useUser();
  const [count, setCount] = useState(0);

  useEffect(()=>{
    
    if(messages){
      console.log(messages);
      setCount(messages.count);
    }

  },[messages])

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
    
      // Format the incoming message (here status will be 'sent')
      const formattedMessage = {
        agentData: receivedMessage.agentData,
        message: receivedMessage.message,
        timestamp: formatTime(new Date(receivedMessage.timestamp)),
        type: receivedMessage.type,
        // Status is now set to 'sent' since this is the confirmed message.
      };
    
      setCount(count + 1);
    
      const dateKey = formatDate(new Date(receivedMessage.timestamp));
    
      setMessages((prevMessages) => {
        let updated = false;
        // Try to update a pending message (if one exists) by matching type and content.
        const newMessages = prevMessages.messages.map((group) => {
          const updatedChats = group.chats.map((chat) => {
            if (
              !updated &&
              chat.message === formattedMessage.message &&
              chat.status === "pending"
            ) {
              updated = true;
              // Update the pending message status to "sent".
              return { ...chat, status: "sent" };
            }
            return chat;
          });
          return { ...group, chats: updatedChats };
        });
    
        // If we found a pending message and updated it, return the updated state.
        if (updated) {
          return { ...prevMessages, messages: newMessages };
        } else {
          // Otherwise, append the new message to the appropriate date group.
          const lastDateGroup = prevMessages.messages[prevMessages.messages.length - 1];
          if (lastDateGroup?.date === dateKey) {
            return {
              ...prevMessages,
              messages: [
                ...prevMessages.messages.slice(0, -1),
                {
                  ...lastDateGroup,
                  chats: [...lastDateGroup.chats, { ...formattedMessage, status: "sent" }],
                },
              ],
            };
          } else {
            return {
              ...prevMessages,
              messages: [
                ...prevMessages.messages,
                { date: dateKey, chats: [{ ...formattedMessage, status: "sent" }] },
              ],
            };
          }
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
          appendPendingMessage(message);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        if(error.message){
          window.alert(error.message);
        }
      }
    };

    const appendPendingMessage = (message) => {
      // Create a pending message format. Here we add a status and set a timestamp.
      const pendingMessage = {
        message: message,
        type: 'incoming',
        timestamp: formatTime(new Date()), // using your formatTime function
        status: "pending",
      };
    
      const dateKey = formatDate(new Date()); // using your formatDate function
    
      setMessages((prevMessages) => {
        const lastDateGroup = prevMessages.messages[prevMessages.messages.length - 1];
    
        if (lastDateGroup?.date === dateKey) {
          // Append pending message to the existing date group.
          return {
            ...prevMessages,
            messages: [
              ...prevMessages.messages.slice(0, -1),
              {
                ...lastDateGroup,
                chats: [...lastDateGroup.chats, pendingMessage],
              },
            ],
          };
        } else {
          // Create a new date group.
          return {
            ...prevMessages,
            messages: [
              ...prevMessages.messages,
              { date: dateKey, chats: [pendingMessage] },
            ],
          };
        }
      });
    };

  return { socket, messages, sendMessage, count };
};

export default useChatSocket;
