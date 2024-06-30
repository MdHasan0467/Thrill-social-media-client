import React, { useContext } from 'react'
import { ChatContext } from '../../../../context/ChatContext';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
// import Cam from "../img/cam.png";
// import Add from "../img/add.png";
// import More from "../img/more.png";



export const Chat = () => {
    const { data } = useContext(ChatContext);
  return (
    <div className="chat">
    <div className="chatInfo">
      <span>{data.user?.displayName}</span>
      <div className="chatIcons">
        <img src='{Cam}' alt="" />
        <img src='{Add}' alt="" />
        <img src='{More}' alt="" />
      </div>
    </div>
    <Messages />
    <Input />
  </div>
  )
}
