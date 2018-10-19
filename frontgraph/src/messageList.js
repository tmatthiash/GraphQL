import React from 'react';

import MessageItem from './MessageItem';



const MessageList = ({ messages }) =>
    messages.map(( msg ) => (
    <div key={msg.id} className="MessageItem"> 
      <MessageItem {...msg} />
    </div>
  ));

export default MessageList;