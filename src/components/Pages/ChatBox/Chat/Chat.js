import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = e.target.message.value;
    axios
      .post("http://localhost:5001/api/messages", { message: newMessage })
      .then((res) => {
        setMessages([...messages, res.data]);
        e.target.reset();
        toast.success("Successfully send message!",{
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message.message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
