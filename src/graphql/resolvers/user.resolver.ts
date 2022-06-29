import { users } from "../../data/data.mock";

import bcrypt from 'bcryptjs';
import { User } from "../../data/dbSchemas/user.schema2";
// import jwt from 'jsonwebtoken';

// const TOKEN_KEY = 'x-access-token';
// const cookieOpts = {
//     path: '/',
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//   };

export const userResolvers = {
    
    Query: {       
        users: () => users,
        user: async (_: any,args: any) => {
            return await users.find( user => user.id === args.id);
        }
    },
    Mutation: {  

        createUser: async (_: any, args: any): Promise<any> => {
            
            try {
                const existingUser = await User.findOne({ email: args.email});
                if (existingUser) {
                    throw new Error('User already exists');
                }
                
                // console.log(args.email, args.password);
                
                const salt = bcrypt.genSaltSync(10);

                const user = await User.create({
                    email: args.email,
                    password: bcrypt.hashSync(args.password, salt), 
                    confirmed: true, 
                    isDisabled: false
                });

                return user;

            } catch (error) {
                throw new Error('User creation failed!' + error.message);
            }
        }
    }

}