const ChatHeader = ({ user }) => {
  return (
    <div className="chat-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.url} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className="log-out-icon">⇦</i>
    </div>
  );
};

export default ChatHeader;
