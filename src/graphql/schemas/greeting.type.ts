import { gql } from "apollo-server-express";


export const greetingTypeDefs = gql`

extend type Query {
    greeting: String   
}
`;