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
            return await User.findOne({_id: args.id});
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

        
    }

}