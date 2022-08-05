export const teamResolvers = {
    Team: {
        lead: async (parent: any, _: any, {model}: any) => {
            // console.log('parent',parent)                         
            return await model.User.findOne({_id: parent.lead.toString()});            
        },
        // user: async (parent: any, _: any, {model}: any) => {
        //     return await model.User.find();
        // }
        // members: async (parent: any, _: any, {model}: any) => {
        //     // console.log('parent',parent)
        //     const result = await model.Team.findOne({_id: parent.id}).populate("members").populate("lead");
            
        //     console.log('team with lead', result);
        //     return result; //await parent.populate("members");
        // }
    }
}