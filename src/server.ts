import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers/greeting.resolver';

const main = async () => {

    // Db connection



    // Server setup
    const app = express();

    // REST api endpoint
    app.get("/", (_, res) => {
        res.send('Hello from EXPERSS');
    });

    const typeDefs = gql`
        type Query {
            greeting: String
        }
    `;

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    apolloServer.start().then(_ => {
        apolloServer.applyMiddleware({ app });
        
        app.listen(4000, () => {
            console.log('Apollo server started and listen to port: 4000');
        })
    });   

}

main().catch((err) => {
    console.error(err);
  });