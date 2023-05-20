import React from "react";
import cam from "../Images/cam.png";
import add from "../Images/add.png";
import more from "../Images/more.png";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <img src={cam} alt="camera-icon" />
          <img src={add} alt="add-icon" />
          <img src={more} alt="mmore-icon" />
        </div>
      </div>
      <Messages />
    </div>
  );
};

export default Chat;
