import { rootType } from "../root";
import { departmentTypeDefs } from "./department.type";
import { greetingTypeDefs } from "./greeting.type";
import { projectTypeDefs } from "./project.type";
import { taskTypeDefs } from "./task.type";
import { teamTypeDefs } from "./team.type";
import { userTypeDefs } from "./user.type";

export const typeDefs = {
    greetingTypeDefs,
    projectTypeDefs,
    userTypeDefs,
    teamTypeDefs,
    taskTypeDefs,
    departmentTypeDefs,
    rootType
}