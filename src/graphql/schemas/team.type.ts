import { gql } from "apollo-server-express";

export const teamTypeDefs = gql`

    type Team {
        name: String!
        description: String!
        members: [User]!
        lead: User!
        createdAt: Date
        updatedAt: Date
    }

    input NewTeam {
        name: String!
        description: String!
        leadId: String!
    }

    extend type Query {
        teams: [Team]!
        team(id: ID!): Team
    }

    extend type Mutation {
        createTeam(input: NewTeam): Team!
    }
`;