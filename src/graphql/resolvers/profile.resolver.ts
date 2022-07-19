export const profileResolvers = {
    UserProfile: {
        user: async (parent: any, _: any, {model}: any) => {  
            // console.log(model);
            let userId = parent.user.toString();
            // console.log(userId);
            return await model.User.findOne({_id: userId});
            // return await model.User.find({$where: (user:any) => user.id == parent.user});
        }
    }
}