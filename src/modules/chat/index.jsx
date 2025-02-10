import { useParams } from "react-router-dom";
import ChatLayout from "../../layouts/chats";
import SingleChat from "../../components/single-chat";

const ChatPage = () => {
  const { chatId } = useParams();
  return (
    <ChatLayout singleChat>
      <SingleChat chatId={chatId}></SingleChat>
    </ChatLayout>
  );
};

export default ChatPage;
