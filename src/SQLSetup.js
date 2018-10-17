const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var sqz = new Sequelize('graphql', 'root', 'XXX', {
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

export{sqz, RequestDB, UserDB};