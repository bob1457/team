import { model, Schema } from "mongoose";
import { IUser } from "src/models/user.model";
// import { UserProfile } from "./user.profile.schema";

export const userSchema = new Schema<IUser>({
    email: { 
        type: String,  
        required: true,
        unique: true        
    },    
    password: { 
        type: String, 
        required: true,
        minLength: 6,
        maxLength: 255,
        unique: false
    }, 
    isDisabled: {
         type: Boolean, 
         required: true
    },
    confirmed: {
        type: Boolean, 
        required: true
   }, 
}, {timestamps: true});

export const User = model<IUser>('User', userSchema);
