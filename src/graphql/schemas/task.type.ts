import { gql } from "apollo-server-express";

export const taskTypeDefs = gql`

    type Task {
        title: String!
        description: String
        note: String
        status: String!
        taskItem: [Task]
        project: Project
        createdAt: Date
        updatedAt: Date
    }

    type Taskitem {        
        description: String!
        note: String
        status: String!
        taskItem: [Task]
        task: Task!
        createdAt: Date
        updatedAt: Date
    }

    input NewTask {
        title: String!
        description: String
        note: String
        projectId: ID
        status: String!
    }

    input NewTaskitem {        
        description: String  
        taskId: ID!      
        status: String!
    }

    extend type Query {
        tasks: [Task]!
        # tasksByStatus(id: ID!, status: String): [Task]!  # use filter?
        task(id: ID!): Task
        taskItem(id: ID!): TaskItem
        taskItems: [TaskItem]!
        # taskitemByStatus(id: ID!, status: String): [TaskItem]! # use filter?
    }

    extended Mutation {
        createTask(input: NewTask): Task!
        createTaskItem(input: NewTaskItem): TaskItem!
    }
`;