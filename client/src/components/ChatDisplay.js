import axios from "axios";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const getMessages = async (senderId, recipientId) => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: senderId, correspondingUserId: recipientId },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUsersMessages(getMessages(userId, clickedUserId));
    setClickedUsersMessages(getMessages(clickedUserId, userId));
  }, [usersMessages, clickedUsersMessages]);

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
  });

  return (
    <>
      <Chat />
      <ChatInput />
    </>
  );
};

export default ChatDisplay;
