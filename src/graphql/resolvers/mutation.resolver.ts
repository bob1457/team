import { UserProfile } from './../../data/dbSchemas/user.profile.schema';
import bcrypt from 'bcryptjs';
import { User } from "../../data/dbSchemas/user.schema2";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Team } from '../../data/dbSchemas/team.schema';
import { Department } from '../../data/dbSchemas/department.schema';


dotenv.config();

const secret = process.env.JWT_SECRET;

export const mutationResolvers = {
    UserRole: {
        ADMIN: 'admin',
        DEVELOPER: 'developer',
        LEAD: 'lead'
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
        },

        createTeam: async (_: any, args: any) : Promise<any> => {

            const newTeam = (name: string, description: string, lead: string) => {
                    const team = new Team({name, description,lead});
                    return team.save();
                }

            try {

                const createdTeam = await newTeam(args.input.name, args.input.description, args.input.leadId);
                // console.log('new team', createdTeam);
                return createdTeam;
                
            } catch (error) {
                throw new Error('Team creation failed! Error: ' + error.message);
            }
        },

        createDepartment: async (_: any, args: any) : Promise<any> => {
            
            const newDepartment =  (name: string, description: string) => {
                const department = new Department({name, description});
                return department.save();
            }

            try {

                const createdDepartment = await newDepartment(args.input.name, args.input.description);
                return createdDepartment;
                
            } catch (error) {
                throw new Error('Department creation failed! Error: ' + error.message);
            }
        }
       
    }
}