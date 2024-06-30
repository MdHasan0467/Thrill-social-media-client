import React, { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessages([...messages, newMessage]);
    
    setNewMessage('');
  };

  return (
    <div className='bg-blue-200 w-3/4 mx-auto pt-20 rounded-lg mt-2'>
      <ul className="chat chat-end">
        {messages.map((message, index) => (
          <li className="chat-bubble chat-bubble-primary" key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
        className='bg-base-200 mb-2 input-bordered rounded-l-lg rounded-none input-sm '
          type="text"
          value={newMessage}
          placeholder='write here your message'
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button className='btn btn-primary btn-sm rounded-none rounded-r-lg' type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
