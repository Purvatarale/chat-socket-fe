import { Button } from "../../modules/ui/button";
import { Textarea } from "../../modules/ui/textarea";
import { SendHorizontal } from "lucide-react";
import ChatConversations from "./chat-conversations";
import request from "../../utils/request";
import { useEffect, useState } from "react";
import { CHAT_CATEGORIES } from "../../constants";
import { useUser } from "../../context/user.context";
import Badge from "../badge";
import useChatSocket from "../../hooks/use-chats.js";

export default function SingleChat({ chatId }) {
  const [initialData, setData] = useState(null);
  const [message, setMessage] = useState("");
  const user = useUser();
  const { messages: data, socket, sendMessage } = useChatSocket(chatId, initialData, setData);

  // console.log({messages: data});

  const fetchData = async () => {
    const res = await request.get(`/conversations/get-messages/${chatId}`);
    if (res.data) {
      setData(res.data);
    }
  };

  const chatCategory = data
    ? CHAT_CATEGORIES.find((chat) => chat.id == data.category)
    : null;

  useEffect(() => {
    fetchData();
  }, [chatId, user]);

  return (
    <div className="flex flex-col h-full bg-blue-100">
      <div className="flex flex-row gap-2 items-center px-2 w-full bg-blue-200 basis-[12.5%] rounded-t-[12px]">
        <img
          src={chatCategory?.icon}
          className="rounded-full w-[50px] aspect-square "
        />
        <div className="flex flex-col">
          <span className="font-bold">{data?.description}</span>
          <span className="text-sm">{chatCategory?.title}</span>
        </div>
        {data?.status === "closed" && (
          <Button className="ml-auto py-1 h-auto rounded-full">
            Reopen Conversation
          </Button>
        )}
        <Badge status={data?.status} />
      </div>
      <div className="w-full basis-[75%] max-h-[75%] overflow-y-auto">
        <ChatConversations chats={data?.messages || []} />
      </div>
      <div className="w-full basis-[12.5%] flex flex-row p-2 gap-2 bg-blue-200 rounded-b-[12px]">
        <Textarea
          placeholder="Type your message here."
          className="resize-none border-[2px] border-[#00000040]"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></Textarea>
        <Button className="h-full" onClick={()=>{ sendMessage(message); setMessage('')}} disabled={!socket}>
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
