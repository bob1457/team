import { Schema, model} from "mongoose";
import { ITeam } from "src/models/team.model";

export const teamSchema = new Schema<ITeam>({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },    
    lead: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
}, {timestamps: true});

export const Team = model<ITeam>('Team', teamSchema);