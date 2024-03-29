import { gql } from "apollo-server-express";


export const userTypeDefs = gql`

    scalar Date

    enum UserRole { 
        ADMIN
        DEVELOPER
        LEAD
        QA
        SA
    }

    type User {
        id: ID!        
        email: String!        
        password: String
        isDisabled: Boolean!
        confirmed: Boolean! 
        profile: UserProfile  
        teams: [Team]     
        createdAt: Date
        updatedAt: Date
    }

    type UserProfile {
        id: ID!
        firstName: String!
        lastName: String!
        # email: String!
        role: UserRole!
        avatarImgUrl: String        
        projects: [Project]
        user: User!
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
        access_token: String!
    }

    input UserCredens {
        email: String!
        password: String!
    }

    input NewUser {
        firstName: String!
        lastName: String!
        email: String!
        role: UserRole!
        team: String
        avatarImgUrl: String        
        password: String!
    }

    input UserData {
        firstName: String!
        lastName: String!
        email: String!
        role: UserRole!
        avatarImgUrl: String        
    }

    input GetUserByEmail {
        email: String!
    }

    type SignOutUser {
        status: Int!
    }

    extend type Query {
        # greeting: String
        getAllUsers: [User]
        getUserById(id:ID!): User
        # user(id:ID!):User
        # getuserByEmail(input: GetUserByEmail): UserProfile
        # userProfile(id: ID!): UserProfile
        # profiles: [UserProfile!]!
        getUserProfile(id:ID!): UserProfile
        # tasks: [Task]
        # task(id: ID!): Task
        # projects: [Project]
        # project(id: ID!): Project
    }

    extend type Mutation {
        # createUser(email: String!, password: String!): User
        createUser(input: NewUser): UserProfile
        createUserProfile(input: UserData): UserProfile
        signInUser(input: UserCredens): SignIn!
        signOutUser: SignOutUser!
        # createTeam(input: NewTeam): Team
    }
`;