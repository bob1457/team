import { Schema, model} from "mongoose";
import { ITeam } from "src/models/team.model";
import { User } from "./user.schema2";

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
    members: [{id: String}],
}, {timestamps: true});

export const Team = model<ITeam>('Team', teamSchema);