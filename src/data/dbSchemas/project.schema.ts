import { Schema } from 'mongoose';
import { IProject } from './../../models/porject.model';

export const projectSchema = new Schema<IProject>({
    title :{ 
        type: "string", 
        required: true
    },
    description :{ 
        type: "string", 
        required: true
    }
})