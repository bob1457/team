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

    type Project {
        id: ID!
        title: String!
        description: String!
    }

    type Task {
        id: ID!
        description: String!
        projectid: String
    }
   
    type Query {
        greeting: String
        users: [User]
        user(id:ID!): User
        tasks: [Task]
        task(id: ID!): Task
        projects: [Project]
        project(id: ID!): Project
    }
`;