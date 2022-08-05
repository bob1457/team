export const queryResolvers = {
    Query: {
        getAllUsers: async (_:any, __:any, {model}: any) => {
            
            return await model.User.find();            
        },
        getuserById: async (_: any, args: any, context: any) => {                        
            return await context.model.User.findOne({_id: args.id});
        },
        userProfile: async (_: any, args: any, context: any) => {            
            return await context.model.UserProfile.findOne({user: args.id});
        },
        teams: async (_: any, __: any, context: any) => {
            // console.log(context);
            return await context.model.Team.find();
        },
        team: async (_: any, args: any, context: any) => {             
            return await context.model.Team.findOne({_id: args.id}).populate("members");
        }      
    }    
}