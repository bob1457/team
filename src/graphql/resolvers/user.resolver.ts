
export const userResolvers = {
    User: {
        profile: async (parent:any, _:any, {model}:any) => {                       
            return model.UserProfile.findOne({user: parent.id});
        }
    }

}