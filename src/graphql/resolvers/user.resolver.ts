import { users } from "../../data/data.mock"

export const userResolvers = {
    Query: {       
        users: () => users,
        user: async (_: any,args: any) => {
            return await users.find( user => user.id === args.id);
        }
    }
}