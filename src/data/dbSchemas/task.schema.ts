import { Schema } from "mongoose";
import { ITask } from "src/models/task.model";

export const taskSchma = new Schema<ITask>({
    description: {
        type: "string", 
        required: true
    },
    projectid: String,
})