const { GraphQLServer } = require('graphql-yoga')
import schema from './src/schema2';
import depthLimit from 'graphql-depth-limit';


const server = new GraphQLServer({
  
  schema: schema
})
const optionsServer = {
  port: 4000,
  validationRules: [depthLimit(5)]
  }
  server.start(optionsServer, () => console.log('Server is running on http://localhost:4000'))
// server.start(() => console.log(`The server is running on http://localhost:4000`))