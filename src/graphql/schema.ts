import { gql } from "apollo-server-express";

export const typeDefs = gql`

    scalar Date

# User types

    type User {
        id: ID!        
        email: String!        
        password: String
        isDisabled: Boolean!
        confirmed: Boolean!        
        createdAt: Date
        updatedAt: Date
    }

    type UserProfile {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        role: String!
        avatarImgUrl: String        
        projects: [Project]
        createdAt: Date
        updatedAt: Date
    }

    type CreateAccountPayload {
        id: String!
        token: String!
        email: String!
    }

    type SignIn {
        isAuthenticated: Boolean!
    }

    input UserCredens {
        email: String!
        password: String!
    }

    input UserData {
        firstName: String!
        lastName: String!
        email: String!
        role: String!
        avatarImgUrl: String        
    }

    input GetUserByEmail {
        email: String!
    }

    type SignOutUser {
        status: Int!
    }

# Project types

    type Project {
        id: ID!
        title: String!
        description: String!
        createdAt: Date
        updatedAt: Date
    }

# Task types

    type Task {
        id: ID!
        description: String!
        projectid: String
        createdAt: Date
        updatedAt: Date
    }
   
#   Root Query

    type Query {
        greeting: String
        getAllUsers: [User]
        getuserById(id:ID!): User
        getuserByEmail(input: GetUserByEmail): UserProfile
        # getUserProfile(id:ID!): UserProfile
        tasks: [Task]
        task(id: ID!): Task
        projects: [Project]
        project(id: ID!): Project
    }

    # Root Mutation

    type Mutation {
        # createUser(email: String!, password: String!): User
        createUser(input: UserCredens): User
        createUserProfile(input: UserData): UserProfile
        signInUser(input: UserCredens): SignIn!
        signOutUser: SignOutUser!
    }

# Root Subscription

    type Subscription {
        _empty: String
    }
`;