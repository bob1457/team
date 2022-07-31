import { gql } from "apollo-server-express";

export const departmentTypeDefs = gql`

    scalar Date
    
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
    

    extend type Query {
        departments: [Department]!
        department(id:ID!) : Department 
    }

    extend type Mutation {
        createDepartment(input: NewDepartment): Department 
    }

`;