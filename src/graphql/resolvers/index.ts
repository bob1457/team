// import { ApolloServer } from 'apollo-server-express';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import {greetingResolvers} from './greeting.resolver';

import greetingResolvers from "./greeting.resolver";
import { userResolvers } from "./user.resolver";

// export const resolvers = _.merge({}, greetingResolvers);

export const resolvers = [
    greetingResolvers,
    userResolvers
];

