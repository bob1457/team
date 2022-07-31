import { Schema } from 'mongoose';
import { IProject } from './../../models/project.model';

export const projectSchema = new Schema<IProject>({
    title :{ 
        type: "string", 
        required: true
    },
    description: {
        type: "string", 
        required: true
    },
    department :{ 
        type: Schema.Types.ObjectId,
        ref: "Department", 
        required:true
    }
})