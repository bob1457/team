import { Schema, model } from "mongoose";
import { IDepartment } from "src/models/department.model";

export const departmentSchema = new Schema<IDepartment>({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
}, {timestamps: true});

export const Department = model<IDepartment>('Department', departmentSchema);