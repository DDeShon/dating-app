import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import { useState } from "react";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);
  return (
    <div className="chat-container">
      <ChatHeader user={user} />

      <div>
        <button className="option">Matches</button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>

      <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />

      <ChatDisplay />
    </div>
  );
};

export default ChatContainer;
