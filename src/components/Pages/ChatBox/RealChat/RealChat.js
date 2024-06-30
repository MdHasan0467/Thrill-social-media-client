import React from 'react'
import { Chat } from './Chat/Chat'
import Sidebar from './Sidebar/Sidebar'

export const RealChat = () => {
  return (
    <div className='home'>
    <div className="container">
      
    <Sidebar />
      <Chat />
    
    </div>
  </div>
  )
}
