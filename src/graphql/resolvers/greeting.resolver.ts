import { users } from "../../data/data.mock"

const greetingResolvers = {
    Query: {
        greeting: () => {
            return "Hello World from Apollo"
        },
    }
}

export default greetingResolvers;