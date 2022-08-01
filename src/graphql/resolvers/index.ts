import { greetingResolvers } from "./greeting.resolver";
import { mutationResolvers } from "./mutation.resolver";
import { profileResolvers } from "./profile.resolver";
import { queryResolvers } from "./query.resolver";
import { teamResolvers } from "./team.resolver";
import { userResolvers } from "./user.resolver";

// export const resolvers = _.merge({}, greetingResolvers);

export const resolvers = [
    queryResolvers,
    mutationResolvers,
    teamResolvers,
    profileResolvers,
    greetingResolvers,
    userResolvers
];

