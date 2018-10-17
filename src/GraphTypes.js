import {sqz, RequestDB, UserDB } from './SQLSetup'
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
  } = require('graphql');

let UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A User',
    fields: () => ({
      firstName: {
        type: GraphQLString,
        description: 'The first name of the User.',
      },
      lastName: {
        type: GraphQLString,
        description: 'The last name of the User.',
      },
      id: {
        type: GraphQLInt,
        description: 'id',
      },
      email: {
        type: GraphQLString,
        description: 'email address',
      },
      requests: {
        type: new GraphQLList(RequestType),
        resolve(parent, args) {
          return RequestDB.findAll({
            where: {
              userID: parent.dataValues.id
            }
          });
        }
      }
    })
  });
  
  let messageType = new GraphQLObjectType({
    name: 'Message',
    description: 'A message to be used with subscriptions',
    fields: () => ({
      text: {
        type: GraphQLString,
        description: 'actual text of the message'
      },
      createdByUser: {
        type: UserType,
        description: 'user that wrote the message',
        resolve(parent, args) {
          return UserDB.findById(parent.userID);
        }
      }
    })
  });
  
  let RequestType = new GraphQLObjectType({
    name: 'Request',
    description: 'A Request',
    fields: () => ({
      description: {
        type: GraphQLString,
        description: 'request description',
      },
      id: {
        type: GraphQLInt,
        description: 'id',
      },
      createdByUser: {
        type: UserType,
        description: 'user that made the thing',
        resolve(parent, args) {
          return UserDB.findById(parent.dataValues.id);
        }
      },
      dateTime: {
        type: GraphQLString,
        description: 'date of the thing'
      },
    })
  });

  export {UserType, RequestType, messageType};