
export const userResolvers = {
    User: {
        profile: async (parent:any, _:any, {model}:any) => {  
            console.log('parent user',parent);          
            return model.UserProfile.findOne({user: parent.id});
        }
    }

}