import axios from "axios";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const getUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
      params: { userId: userId, correspondingUserId: clickedUserId },
      });
      serUsersMessages(response.data);
    } catch (err) {
    console.log(err);
  };

  return (
    <>
      <Chat />
      <ChatInput />
    </>
  );
};

export default ChatDisplay;
