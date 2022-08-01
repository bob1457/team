export const profileResolvers = {
    UserProfile: {
        user: async (parent: any, _: any, {model}: any) => {             
            return await model.User.findOne({_id: parent.user});
            // return await model.User.find({$where: (user:any) => user.id == parent.user});
        }
    }
}