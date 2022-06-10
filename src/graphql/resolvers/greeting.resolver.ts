import { users } from "../../data/data.mock"

export const resolvers = {
    Query: {
        greeting: () => {
            return "Hello World from Apollo"
        },
        users: () => users,
        user: async (_: any,args: any) => {
            return await users.find( user => user.id === args.id);
        }
    }
}