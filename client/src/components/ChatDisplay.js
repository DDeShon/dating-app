import axios from "axios";
import { useEffect } from "react/cjs/react.production.min";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);

  const getUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      serUsersMessages(response.data);
    } catch (err) {
      console.log(err);
    }

    useEffect(() => {
      getUsersMessages();
    }, []))

    return (
      <>
        <Chat />
        <ChatInput />
      </>
    );
  };
};

export default ChatDisplay;
