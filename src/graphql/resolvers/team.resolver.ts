export const teamResolvers = {
    Team: {
        lead: async (parent: any, _: any, {model}: any) => {
            // console.log('parent',parent)                         
            return await model.User.findOne({_id: parent.lead.toString()});            
        }
    }
}