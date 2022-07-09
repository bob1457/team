import { gql } from "apollo-server-express";

export const projectTypeDefs = gql`

    scalar Date

    type Project {
        id: ID!
        title: String!
        description: String!
        createdAt: Date
        updatedAt: Date
    }



`;