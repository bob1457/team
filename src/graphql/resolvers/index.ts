import { greetingResolvers } from "./greeting.resolver";
import { mutationResolvers } from "./mutation.resolver";
import { profileResolvers } from "./profile.resolver";
import { queryResolvers } from "./query.resolver";
import { userResolvers } from "./user.resolver";

// export const resolvers = _.merge({}, greetingResolvers);

export const resolvers = [
    queryResolvers,
    mutationResolvers,
    profileResolvers,
    greetingResolvers,
    userResolvers
];

