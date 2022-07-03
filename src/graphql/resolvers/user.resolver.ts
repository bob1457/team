import bcrypt from 'bcryptjs';
import { User } from "../../data/dbSchemas/user.schema2";
import { UserProfile } from '../../data/dbSchemas/user.profile.schema';
// import jwt from 'jsonwebtoken';

// const TOKEN_KEY = 'x-access-token';
// const cookieOpts = {
//     path: '/',
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//   };

export const userResolvers = {
    
    Query: {       
        getAllUsers: async () => {
            return User.find();            
        },
        getuserById: async (_: any, args: any) => {
            return await User.findOne({id: args.id});
        },
        getuserByEmail: async (_: any, args: any) => {
            return await UserProfile.findOne({email: args.input.email});
        },
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
        },
        createUserProfile: async (_: any, args: any): Promise<any> => {
            try {
                const profile = await UserProfile.create({ 
                    firstName:args.input.firstName,
                    lastName:args.input.lastName,
                    role:args.input.role,
                    email:args.input.email,
                    avatarImgUrl: args.input.avatarImgUrl
                });

                return profile;

            } catch (error) {
                throw new Error('User profile creation failed! Error: ' + error.message);
            }
        }
    }

}