const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,

} = require('graphql');


const Sequelize = require('sequelize');

const Op = Sequelize.Op;
var sqz = new Sequelize('graphql', 'root', 'PUT_YOUR_MYSQL_PASSWORD_HERE', {
  host: "localhost",
  port: 3306,
  dialect: 'mysql',
  operatorsAliases: Op
});


sqz.authenticate()
  .then(function () {
    console.log("DB connection established");
  })
  .catch(function (err) {
    console.log(err);
    console.log("DB connection exploded");
  })

var UserDB = sqz.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});
var RequestDB = sqz.define('request', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.STRING
  },
  userID: {
    require: true,
    type: Sequelize.INTEGER
  },
  dateTime: {
    type: Sequelize.DATE
  }
})

sqz.sync();





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
      }
      // root queries go here!
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
      }
    }
  })
});





export default schema;