import React from "react";
import Img from "../Images/img.png";
import attach from "../Images/attach.png";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something" />
      <div className="send">
        <img src={Img} alt="img-icon" />
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <img src={attach} alt="attach-files-icon" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
