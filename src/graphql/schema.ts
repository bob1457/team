import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        avatarImgUrl: String
        password: String
    }

    # type Users {
    #     users: [User]
    #     # user(id: ID!): User
    # }

    type Query {
        greeting: String
        users: [User]
        user(id:ID!): User
    }
`;