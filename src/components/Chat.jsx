import React, { useContext } from "react";
import cam from "../Images/cam.png";
import add from "../Images/add.png";
import more from "../Images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const {
    data: { user },
  } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{user.displayName}</span>
        <div className="chatIcons">
          <img src={cam} alt="camera-icon" />
          <img src={add} alt="add-icon" />
          <img src={more} alt="mmore-icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
