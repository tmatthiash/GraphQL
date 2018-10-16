'use strict';

var _require = require('graphql-yoga'),
    GraphQLServer = _require.GraphQLServer;
// var Sequelize = require('sequelize')


var _require2 = require('./src/schema2'),
    schema = _require2.schema;

// const Op = Sequelize.Op;
// var sqz = new Sequelize('graphql', 'root','2712!Lamda',{
//   host: "localhost",
//   port: 3306,
//   dialect: 'mysql',
//   operatorsAliases: Op
// });


// sqz.authenticate()
//   .then(function (){
//     console.log("DB connection established");
//   })
//   .catch(function (err){
//     console.log(err);
//     console.log("DB connection exploded");
//   })

// var UserDB = sqz.define('user', {
//   id:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   email:{
//     type: Sequelize.STRING
//   },
//   firstName:{
//     type: Sequelize.STRING
//   },
//   lastName:{
//     type: Sequelize.STRING
//   }
// });
// var RequestDB = sql.define('request', {
//   id:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   userID:{
//     require: true,
//     type: Sequelize.INTEGER
//   },
//   description:{
//     type:Sequelize.INTEGER
//   },
//   dateTime:{
//     type: Sequelize.dateTime
//   }
// })

// // UserDB.sync({force: true}).then(function (){
// //   return UserDB.create({
// //     id: "users_121212",
// //     email: "testguy@whatever.mu",
// //     firstName: "default",
// //     lastName: "manguy"
// //   })
// // })

// sqz.sync();

// const resolvers = {
//   Query: {
//     description: () => `This is the API for a simple blogging application`,
//     users: () => users,
//     user: (parent, args) => users.find(user => user.id === args.id),
//     usersFromDB: () => UserDB.findAll().then(function(users){
//       return users;
//     }),
//     requests: () => RequestDB.findAll().then(function(requests){
//       return requests;
//     })
//   },
//   Mutation: {
//     createUser: (parent, args) => {
//       const user = {
//         id: `users_${idCount++}`,
//         email: args.email,
//         firstName: args.firstName,
//         lastName: args.lastName,
//       }
//       users.push(user)
//       return user
//     },
//     createUserFromDB: (parent, args) =>{
//       const user = UserDB.build({
//         // id: `users_${idCount++}`,
//         email: args.email,
//         firstName: args.firstName,
//         lastName: args.lastName
//       });
//       return user.save().then(function(res){
//         const retuser = {
//           id: res.dataValues.id,
//           email: res.dataValues.email,
//           lastName: res.dataValues.lastName,
//           firstName: res.dataValues.firstName
//         }
//         return retuser;
//       })
//       .catch(function(err){
//         console.log(err);
//         console.log("saving entry blew the fuck up");
//       });
//     },

//     createRequest: (parent, args) =>{
//       const request = RequestDB.build({
//         // id: `users_${idCount++}`,
//         description = args.description,
//         userID = args.userID,
//         dateTime = Date.now()
//       });
//       return request.save().then(function(res){
//         const retRequest = res.dataValues;
//         return retRequest;
//       })
//       .catch(function(err){
//         console.log(err);
//         console.log("saving entry blew the fuck up");
//       });
//     },


//     deleteUser: (parent, args) => {
//       const userIndex = users.findIndex(user => user.id === args.id)
//       if (userIndex > -1) {
//         const deleted = users.splice(userIndex, 1)
//         return deleted[0]
//       }
//       return null
//     },
//     editUser: (parent, args) =>{
//       var editedUser = users.find(user => user.id === args.id);
//       editedUser.firstName = args.firstName != null ? args.firstName : editedUser.firstName;
//       editedUser.lastName = args.lastName != null ? args.lastName : editedUser.lastName;
//       return editedUser;
//     }
//   },
// }

// const resolvers = {
//   Query: {
//     description: () => `This is the API for a simple blogging application`
//   }
// }

// const server = new GraphQLServer({
//   typeDefs: './src/schema.graphql',
//   resolvers
// })

var server = new GraphQLServer({

  schema: schema
});

server.start(function () {
  return console.log('The server is running on http://localhost:4000');
});
