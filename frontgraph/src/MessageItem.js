import React, { Component } from 'react';

// import User from './messageuery';

const MessageItem = (message) => {
    return (
      <div>
          {message.text}
      </div>
    );

}

export default MessageItem;