import { IUser } from 'src/models/user.model';
import bcrypt from 'bcryptjs';
import { User } from "../../data/dbSchemas/user.schema2";
import { UserProfile } from '../../data/dbSchemas/user.profile.schema';


// const TOKEN_KEY = 'x-access-token';
// const cookieOpts = {
//     path: '/',
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//   };

export const userResolvers = {
    UserRole: {
        ADMIN: 'admin',
        DEVELOPER: 'developer',
        LEAD: 'lead'
    },
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
                               
                const salt = bcrypt.genSaltSync(10);

                const createUser = (email: String, password: String, isDisabled: Boolean, confirmed: Boolean) => {
                    const user = new User({email, password, isDisabled, confirmed});
                    return user.save();
                }

                const createProfile = (
                    firstName: String,
                    lastName:String,                    
                    email:String,
                    role: String,
                    avatarImgUrl: String,
                    user: String,
                    ) => {

                        console.log('get here to create profile...');

                        const profile = new UserProfile({firstName, lastName, email, role, avatarImgUrl, user});

                        return profile.save();
                }

                createUser(args.input.email, bcrypt.hashSync(args.input.password, salt), false, true)
                .then((user: IUser) => {
                        
                        console.log(user);

                        const userId = user.id.toString();
                        console.log("new user id: ", userId);
                        // console.log('get here to create profile...');
                        createProfile(args.input.firstName, args.input.lastName, args.input.email, args.input.role, args.input.avatarImgUrl, userId)
                        .then((profile) => {
                            console.log(profile);
                            return profile;
                        }).catch((error) => {throw new Error('User creation failed! Error: ' + error.message);}); 
                    
                    return user;
                    
                })

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