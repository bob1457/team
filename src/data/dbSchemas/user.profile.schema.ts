import { model, Schema } from "mongoose";
import { IUserProfile } from "src/models/user.profile.model";

export const userProfileSchema = new Schema<IUserProfile>({
    firstName: { 
        type: "string", 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true
    },
    role: {
        type: String, 
        required: true
    },    
    avatarImgUrl: String, 
    user: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
       
}, {timestamps: true});

export const UserProfile = model<IUserProfile>('UserProfile', userProfileSchema);