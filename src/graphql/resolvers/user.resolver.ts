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
        users: async () => {
            return User.find();            
        },
        user: async (_: any, args: any) => {
            return await User.findOne({id: args.id});
        }
    },
    Mutation: {  

        createUser: async (_: any, args: any): Promise<any> => {

            // console.log('get here');
            // console.log(args.input.email);
            
            try {
                const existingUser = await User.findOne({ email: args.input.email});
                if (existingUser) {
                    throw new Error('User already exists');
                }
                
                // console.log(args.email, args.password);
                
                const salt = bcrypt.genSaltSync(10);

                const user = await User.create({
                    email: args.input.email,
                    password: bcrypt.hashSync(args.input.password, salt), 
                    confirmed: true, 
                    isDisabled: false
                });

                return user;

            } catch (error) {
                throw new Error('User creation failed! Error: ' + error.message);
            }
        }
    }

}