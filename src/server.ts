import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers/greeting.resolver';
import { typeDefs } from './graphql/schema';
import * as dotenv from 'dotenv';
import { Connect } from './data/dbconnect';
// import mongoose, { Mongoose } from 'mongoose';

dotenv.config();


const port = process.env.PORT || 4000;
// console.log(port);

// Db connection
Connect('team','mongodb://127.0.0.1:27017');

// mongoose.connect('mongodb://127.0.0.1:27017/team').then(() => {
//     console.log('connected to mongodb...');
// })
// .catch((err) => {
//     console.log('error: ' + err.message);
// })

// Server setup
const app = express();

// REST api endpoint
app.get("/", (_, res) => {
    res.send('Hello from EXPERSS');
});

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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