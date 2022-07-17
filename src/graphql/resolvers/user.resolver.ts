import bcrypt from 'bcryptjs';
import { User } from "../../data/dbSchemas/user.schema2";
import { UserProfile } from '../../data/dbSchemas/user.profile.schema';
import jwt from 'jsonwebtoken';
// import { private_key } from 'src/helpers/secret';
import * as dotenv from 'dotenv';


dotenv.config();
// const TOKEN_KEY = 'x-access-token';
// const cookieOpts = {
//     path: '/',
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//   };

// const private_key = process.env.JWT_SECRET; // 'LS0tLS1CRUdJTiB45JJVkFURSBLRVk-090tLQpNSUlFb1F2JQkFBS0NBUUIySk0';
const secret = process.env.JWT_SECRET;

export const userResolvers = {
    UserRole: {
        ADMIN: 'admin',
        DEVELOPER: 'developer',
        LEAD: 'lead'
    },
    Query: {       
        getAllUsers: async (_:any, __:any, context: any) => {
            console.log(context);
            return await context.model.User.find();            
        },
        getuserById: async (_: any, args: any, context: any) => {
            return await context.model.User.findOne({_id: args.id});
        },
        getuserByEmail: async (_: any, args: any, context: any) => {
            return await context.model.UserProfile.findOne({email: args.input.email});
        },
        getuserProfile: async (_: any, args: any, context: any) => {
            return await context.model.UserProfile.findOne({user: args.id});
        }
    },
    Mutation: {  

        createUser: async (_: any, args: any): Promise<any> => {
            
            try {
                const existingUser = await User.findOne({ email: args.input.email});
                if (existingUser) {
                    throw new Error('User already exists');
                }                
                               
                const salt = bcrypt.genSaltSync(10);
                let userProfile = null;

                const newUser = (email: String, password: String, isDisabled: Boolean, confirmed: Boolean) => {
                    const user = new User({email, password, isDisabled, confirmed});
                    return user.save();
                }

                const createProfile = (
                    firstName: String,
                    lastName:String,
                    role: String,
                    avatarImgUrl: String,
                    user: String,
                    ) => {

                        console.log('get here to create profile...');

                        const profile = new UserProfile({firstName, lastName, role, avatarImgUrl, user});

                        return profile.save();
                }

                const createdUser = await newUser(args.input.email, bcrypt.hashSync(args.input.password, salt), false, true)
                // .then((user: IUser) => {
                        
                        console.log(createdUser);

                        const userId = createdUser.id.toString();
                        console.log("new user id: ", userId);


                        const useProfile = await createProfile(args.input.firstName, args.input.lastName, args.input.role, args.input.avatarImgUrl, userId);
                
                        console.log(userProfile);

                        return useProfile;               

            } catch (error) {
                throw new Error('User creation failed! Error: ' + error.message);
            }
        },

        signInUser: async (_: any, args: any) : Promise<any> => {

            // console.log(secret);

            try {
                
                const user = await User.findOne({email: args.input.email});
                
                if(!user) {
                    throw new Error('Incorrect credentials!')
                }

                const isCorretPasswords = await bcrypt.compare(args.input.password, user.password);

                if(!isCorretPasswords) {
                    throw new Error('Incorrect credentials!')
                }

                if(secret){
                    const token = await jwt.sign({ userid: user.id, email: user.email }, secret, {
                                    // algorithm: "RS256", // this algorithm needs to use a public/private key to sign, more securei, recommended in produciton 
                                    expiresIn: '1h'
                                });  
                                
                    return { isAuthenticated: true, access_token: token}

                } else {
                    throw new Error('JWT signing failed!');
                }

            } catch (error) {
                throw new Error('Error occured: ' + error.message);
            }
        }

        
    }

}