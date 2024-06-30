import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";
import LargeNavbar from "../../../Shared/LargeNavbar/LargeNavbar";

const DynamicChat = () => {
  const userData = useLoaderData();
  // console.log(userData)

  const { logUser } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  const [comeMessage, setComeMessage] = useState([]);

  //!--------Sender-------------
  useEffect(() => {
    fetch(`http://localhost:5001/chat/receiverEmail/${userData?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data);
      });
  }, [userData?.email]);

  useEffect(() => {
    fetch(`http://localhost:5001/chat/senderEmail/${logUser?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data);
      });
  }, [logUser?.email]);
  //!--------End-------------

  //!--------Receiver-------------
  useEffect(() => {
    fetch(`http://localhost:5001/chatCome/receiverEmail/${userData?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComeMessage(data);
      });
  }, [userData?.email]);

  useEffect(() => {
    fetch(`http://localhost:5001/chatCome/senderEmail/${logUser?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComeMessage(data);
      });
  }, [logUser?.email]);
  //!--------End-------------

  // useEffect(() => {
  //     fetch(`http://localhost:5001/chat/${userData?.email}`)
  //         .then(res => res.json())
  //         .then(data => {
  //             console.log(data)
  //             setMessage(data)
  //         })

  //     fetch(`http://localhost:5001/chat/${logUser?.email}`)
  //         .then(res => res.json())
  //         .then(data => {
  //             console.log(data)
  //             // setMessage(data)
  //     })
  // },[userData?.email, logUser?.email])

  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const messages = event.target.message.value;
    // alert(messages)

    const sendMessage = {
      senderName: logUser?.name,
      senderEmail: logUser?.email,
      receiverName: userData?.name,
      receiverEmail: userData?.email,
      messages,
    };

    console.log(sendMessage);

    fetch("http://localhost:5001/message", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendMessage),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          toast.success("Message send",{
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          event.target.reset();
        }
      });

    //   setMessages([...messages, newMessage]);

    //   setNewMessage('');
  };

  return (
    <div>
      <LargeNavbar></LargeNavbar>
      <div className="user-nav flex justify-center my-5 bg-blue-300">
        <h1 className="font-semibold w-auto my-auto">
          Chat with {userData?.name}
        </h1>

        <div className="flex flex-wrap gap-x-2 gap-y-2 mx-5">
          <div className="relative flex-shrink-0">
            <span className="absolute bottom-0 right-0 bg-success w-4 h-4 border rounded-full "></span>
            <img
              src={userData?.image}
              alt=""
              className="w-12 h-12 border rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-200 w-3/4 max-h-96 h-96 relative overflow-auto mx-auto pt-20 rounded-lg mt-2">
        <ul className="chat chat-start">
          {comeMessage.map((msg, i) => (
            <div className="flex chat-bubble bg-transparent">
              <img
                src={userData?.image}
                alt=""
                className="w-12 h-12 border rounded-full"
              />
              <li className="chat-bubble chat-bubble-primary mr-2" key={i._id}>
                {msg.messages}
              </li>
            </div>
          ))}
        </ul>

        <ul className="chat chat-end">
          {message.map((message, i) => (
            <div className="flex chat-bubble bg-transparent">
              <li className="chat-bubble chat-bubble-primary mr-2" key={i._id}>
                {message.messages}
              </li>
              <img
                src={logUser?.image}
                alt=""
                className="w-12 h-12 border rounded-full"
              />
            </div>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="fixed bottom-16 mx-auto py-3 bg-blue-200 w-3/4 "
        >
          <input
            className="bg-base-200 mb-2 input-bordered rounded-l-lg rounded-none input-sm "
            type="text"
            name="message"
            placeholder="write here your message"
          />
          <button
            className="btn btn-primary btn-sm rounded-none rounded-r-lg"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default DynamicChat;
