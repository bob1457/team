export const queryResolvers = {
    Query: {
        getAllUsers: async (_:any, __:any, {model}: any) => {
            // console.log(model);
            return await model.User.find();            
        },
        getuserById: async (_: any, args: any, context: any) => {                        
            return await context.model.User.findOne({_id: args.id});
        },
        userProfile: async (_: any, args: any, context: any) => {            
            return await context.model.UserProfile.findOne({user: args.id});
        }        
    }    
}