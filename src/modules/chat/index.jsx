import { useParams } from "react-router-dom";
import {useState} from "react";
import ChatLayout from "../../layouts/chats";
import SingleChat from "../../components/single-chat";

const ChatPage = () => {
  const { chatId } = useParams();
  const [flag, setFlag] = useState(0);

  return (
    <ChatLayout singleChat flag={flag}>
      <SingleChat chatId={chatId} setFlag={setFlag}></SingleChat>
    </ChatLayout>
  );
};

export default ChatPage;