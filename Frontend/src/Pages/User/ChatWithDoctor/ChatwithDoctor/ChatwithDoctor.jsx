import React from 'react'
import { useParams } from 'react-router-dom';

const ChatwithDoctor = () => {
  const doctorId = useParams().doctorId;
  
  
  return (
    <div>ChatwithDoctor</div>
  )
}

export default ChatwithDoctor