import { gql } from "apollo-server-express";

export const projectTypeDefs = gql`

    scalar Date

    enum Status { 
        NEW
        STARTED
        COMPLETED
        ONHOLD
        CANCELED
    }

    type Department {
        id: ID!
        name: String!
        description: String!
        projects: [Project]!
        createdAt: Date
        updatedAt: Date
    }

    input NewDepartment {        
        name: String!
        description: String!        
    }

    type Project {
        id: ID!
        department: Department!
        title: String!
        description: String!
        notes: String
        status: Status!
        members: [User]!
        manager: User!
        createdAt: Date
        updatedAt: Date
    }

    input NewProject {
        departmentId: ID!
        title: String!
        description: String!
        status: Status!
    }

    extend type Query {        
        projects: [Project]!
        project(id:ID!): Project
    }

    extend type Mutation {        
        createProject(input: NewProject): Project
    }

`;