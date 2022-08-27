// import { IUserProfile } from "./user.profile.model";

export interface IUser {
    id: string;
    email: string;    
    password: string;
    confirmed: boolean;
    isDisabled: boolean;
    teams: [string];
    // profile: IUserProfile;
}