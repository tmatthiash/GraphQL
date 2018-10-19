
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import React, { Component } from 'react';
import MessageList from './messageList'

const GET_ALL_MESSAGES = gql`
  {
    allMessages{
        text
        id
        createdByUser{
        firstName
        }
    }
  }
`;

const Messages = () => (
    <Query query={GET_ALL_MESSAGES}>
        {({ data, loading }) => {
        if (loading || !data) {
            return <h1>I'm loading maybe?</h1>;
        } 
            return <MessageList messages={data.allMessages} />;
        }}
    </Query>
);

export default Messages;