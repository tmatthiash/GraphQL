import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_ALL_USER = gql`
  {
    user(id: 1) {
      email
      firstName
      lastName
    }
  }
`;

const User = () => (
  <Query query={GET_ALL_USER}>
    {({ data, loading }) => {
      // const userData = data.user;
      if (loading || !data) {
        return <h1>I'm loading maybe?</h1>;
      }
      const userData = data.user;
      return (
        <div>
        <h1>User Data:</h1>
          User Email: {userData.email} <br/>
          User First Name: {userData.firstName} <br/>
          User Last Name: {userData.lastName}
        </div>
      );
    }}
  </Query>
);

export default User;