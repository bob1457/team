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
}, {timestamps: true});

export const User = model<IUserProfile>('UserProfile', userProfileSchema);