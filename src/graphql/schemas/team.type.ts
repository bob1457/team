import { gql } from "apollo-server-express";

export const teamTypeDefs = gql`

    type Team {
        id: ID!
        name: String!
        description: String!
        members: [User]
        # users: [User]
        lead: User!
        createdAt: Date
        updatedAt: Date
    }

    input NewTeam {
        name: String!
        description: String!
        leadId: String!
    }

    input NewMember{
        userId: String!
        teamId: String!
    }

    extend type Query {
        teams: [Team]!
        team(id: ID!): Team
    }

    extend type Mutation {
        createTeam(input: NewTeam): Team!
        addMember(input: NewMember): User
    }
`;