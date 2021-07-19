import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./graphql/resolvers/resolvers"; 
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { join } from 'path';
import { createConnection } from "typeorm";

const typeDefs = importSchema(join(__dirname, '/graphql/schema.graphql')); 
const schema = makeExecutableSchema({ typeDefs, resolvers });

function createServer() {
    return new GraphQLServer({
        schema: schema,
    },)
}
const server = createServer();

createConnection().then(() => {
    server.start(() => console.log('Server is running on localhost:4000'))
}).catch((error) => {
    console.log(error);
});
