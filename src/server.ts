import express from 'express';
import { ApolloServer, Config } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import * as dotenv from 'dotenv';
import { Connect } from './data/dbconnect';
import { resolvers } from './graphql/resolvers';
import { mergeResolvers } from '@graphql-tools/merge'

dotenv.config();


const port = process.env.PORT || 4000;

// Db connection
Connect('team','mongodb://127.0.0.1:27017');

// Server setup
const app = express();

// REST api endpoint
app.get("/", (_, res) => {
    res.send('Hello from EXPERSS');
});

const serverConfig : Config = {
    typeDefs,
    resolvers: mergeResolvers(resolvers),
    context: {}
}

const apolloServer = new ApolloServer(serverConfig);

const main = async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: true });

    // apolloServer.start().then(_ => {
    //     apolloServer.applyMiddleware({ app, cors: true });
    
    app.listen(port, () => {
        console.log(`Apollo server started and is listening to port: ${port}`);
    });
};

main().catch((err) => {
    console.error(err);
});