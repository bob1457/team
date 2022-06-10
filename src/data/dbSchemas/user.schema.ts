import { model, Schema } from "mongoose";
import { IUser } from "src/models/user.model";

export const userSchema = new Schema<IUser>({
    firstName: { 
        type: "string", 
        required: true 
    },
    lastName: { 
        type: "string", 
        required: true
    },
    email: { 
        type: "string", 
        required: true
    },
    avatarImgUrl: String,
    password: { 
        type: "string", 
        required: true
    },
}, {timestamps: true});

export const User = model<IUser>('User', userSchema);