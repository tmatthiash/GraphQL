const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

import { PubSub } from 'graphql-yoga';
import {sqz, RequestDB, UserDB } from './SQLSetup'
import { messageType, RequestType, UserType } from './GraphTypes';

const pubsub = new PubSub();
var allTheMessages = [];
var messageIndex = 0;


let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: new GraphQLList(UserType),
        resolve: () => UserDB.findAll().then(function (users) {
          return users;
        }),
      },
      user: {
        type: UserType,
        args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
        resolve: (parentValue, args) => UserDB.findById(args.id).then(function (user) {
          return user;
        })
      },
      allMessages:{
        type: new GraphQLList(messageType),
        resolve: () => {
          return allTheMessages;
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      createRequest: {
        type: RequestType,
        args: {
          createdById: { type: new GraphQLNonNull(GraphQLInt) },
          description: { type: GraphQLString }
        },
        resolve: (parentValue, args) => {
          const createRequest = RequestDB.build({
            description: args.description,
            userID: args.createdById,
            dateTime: Date.now()
          });
          return createRequest.save().then(function (res) {
            const retReq = {
              id: res.dataValues.id,
              description: res.dataValues.description,
              dateTime: res.dataValues.dateTime
            }
            return retReq;
          });
        }
      },

      createUser: {
        type: UserType,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
        },
        resolve: (parentValue, args) => {
          const createUser = UserDB.build({
            email: args.email,
            firstName: args.lastName,
            lastName: args.lastName
          });
          return createUser.save().then(function (res) {
            const retUser = {
              id: res.dataValues.id,
              email: res.dataValues.email,
              firstName: res.dataValues.firstName,
              lastName: res.dataValues.lastName
            }
            return retUser;
          });
        }
      },

      createMessage: {
        type: messageType,
        args: {
          createdById: { type: new GraphQLNonNull(GraphQLInt) },
          text: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: (parentValue, args) => {
          const newMessage = {
            id: messageIndex,
            userID: args.createdById,
            text: args.text
          }
          messageIndex++;
          allTheMessages.push(newMessage);
          pubsub.publish('messageAdded', newMessage)
          return newMessage;
        }
      }
    }
  }),
  subscription: new GraphQLObjectType({
    name: 'RootSubscription',
    fields: {
      messageAdded: {
        type: GraphQLList(messageType),
        resolve: (payload, args, context, info) => {
          //payload actually contains just the message that triggers this,
          //return payload as an array w/ one member should work
          return allTheMessages;
        },
        subscribe: () => pubsub.asyncIterator('messageAdded')
      }
    }
  })
});


export default schema;