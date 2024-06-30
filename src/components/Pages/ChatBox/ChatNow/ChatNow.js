import React from 'react';
import { ChatEngine } from 'react-chat-engine'

const ChatNow = () => {
    // const user = {
    //     "id": 1,
    //     "admin": "john_smith",
    //     "title": "Canada Day Party!",
    //     "created": "2020-09-05T20:28:22.352373Z",
    //     "people": [
    //         {
    //             "person": "john_smith"
    //         }
    //     ]
    // }
    return (
        <div>
        <ChatEngine
        ProjectID = 'c3ff08ae-00e4-4ab1-abfd-f4425a34436a'
        publicKey={'69819e08-271b-4a15-b27a-5792aeef8bfa'}
        userName={'john_smith'}
        userSecret={'secret_1234'}
        height = '100vh'
      />
        </div>
    );
};

export default ChatNow;
