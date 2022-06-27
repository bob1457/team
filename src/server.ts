import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import * as dotenv from 'dotenv';
import { Connect } from './data/dbconnect';


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

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: {}
});

const main = async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: true });

    // apolloServer.start().then(_ => {
    //     apolloServer.applyMiddleware({ app, cors: true });
    
    app.listen(port, () => {
        console.log(`Apollo server started and listen to port: ${port}`);
    });
};

main().catch((err) => {
    console.error(err);
});