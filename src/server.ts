import express from 'express';
import { ApolloServer, Config } from 'apollo-server-express';
// import { typeDefs } from './graphql/schema';
import * as dotenv from 'dotenv';
import { Connect } from './data/dbconnect';
import { resolvers } from './graphql/resolvers';
import { mergeResolvers } from '@graphql-tools/merge';
import { rootType } from './graphql/root';
import { projectTypeDefs } from './graphql/schemas/project.type';
import { userTypeDefs } from './graphql/schemas/user.type';
import { greetingTypeDefs } from './graphql/schemas/greeting.type';
import { model } from './data/dbSchemas';
import { teamTypeDefs } from './graphql/schemas/team.type';
import { departmentTypeDefs } from './graphql/schemas/department.type';
// import { isAuthenticated } from './middleware/isAuthenticated';

dotenv.config();


const PORT = process.env.PORT || 4000;

// Db connection
Connect('team','mongodb://127.0.0.1:27017');


// Server setup
const app = express();

// REST api endpoint
app.get("/", (_, res) => {
    res.send('Hello from EXPRESS');
});

// const baseTypeDefs = gql`  type Query, type Mutation, type Subscription`;

const context = async ({ req } : any) => {
    // let auth = null;
    let user = null;

    // const token = req.headers.authorization.split(' ')[1] || null;
    // console.log('token in', token);

    // auth = await isAuthenticated(token);
    // if(auth !=null) {
    //     user = await model.User.findOne({_id: auth.userid});
    //     console.log('status', auth);
    // }
    
    return ({
        // isAuthenticated,
        user,
        // token,        
        model
    });
}

const serverConfig : Config = {
    typeDefs: [
        rootType, 
        departmentTypeDefs,
        userTypeDefs, 
        greetingTypeDefs, 
        projectTypeDefs,
        teamTypeDefs
    ],
    resolvers: mergeResolvers(resolvers),
    context
}



const apolloServer = new ApolloServer(serverConfig);

const main = async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: true });

    // apolloServer.start().then(_ => {
    //     apolloServer.applyMiddleware({ app, cors: true });
    
    app.listen(PORT, () => {
        console.log(`Apollo server started and is accessible at: 'http://localhost:${PORT}${apolloServer.graphqlPath}'`);
        // console.log(`http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
};

main().catch((err) => {
    console.error(err);
});