import { Department } from './../../data/dbSchemas/department.schema';
import { Team } from './../../data/dbSchemas/team.schema';
import { IDepartment } from 'src/models/department.model';
import { IResolvers } from '@graphql-tools/utils';
import { ITeam } from 'src/models/team.model';
import { IUser } from 'src/models/user.model';
import { IUserProfile } from 'src/models/user.profile.model';

export const queryResolvers : IResolvers = {
    Query: {
        getAllUsers: async (_:any, __:any, {model}: any) => {
            
            return await model.User.find();            
        },
        getUserById: async (_: any, args: { id: string }, context: any) : Promise<[IUser]> => {   
            // console.log('context info', context.user);
            // if(!context.user) {
            //     return null;
            // }
            
            // get use profile by userid and check role for authorization?
            //
            return await context.model.User.findOne({_id: args.id}).populate("teams");
        },
        getUserProfile: async (_: any, args: any, context: any) : Promise<IUserProfile> => {            
            return await context.model.UserProfile.findOne({user: args.id});
        },
        teams: async (_: any, __: any, context: any) : Promise<[ITeam]> => {
            // console.log(context);
            return await context.model.Team.find().populate("members");
        },
        team: async (_: any, args: {id: string}, context: any) : Promise<ITeam> => {             
            return await context.model.Team.findOne({_id: args.id}).populate("members");
        },
        getAllDepartments: async(_: any, __:any, {model}: any) : Promise<[IDepartment]> => {
            return await model.Department.find();
        },
        getDepartmentById: async(_: any, args: {id: string}, {model}: any) : Promise<IDepartment> => {
            return await model.Department.findOne({_id: args.id});
        }
    }    
}